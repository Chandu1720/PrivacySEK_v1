"""Automated responsive, accessibility-flow and SEO checks for PrivacySEK.

Run: python3 qa/site_checks.py [base_url]   (default http://localhost:8080)
Screenshots are written to /tmp/ps-qa/.
"""
import asyncio, json, sys
from pathlib import Path
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080"
OUT = Path("/tmp/ps-qa"); OUT.mkdir(parents=True, exist_ok=True)
PAGES = ["/", "/solutions", "/about", "/contact"]
VIEWPORTS = {"mobile": (375, 812), "tablet": (768, 1024), "desktop": (1280, 1800)}
fails: list[str] = []

def check(ok, msg):
    print(("PASS " if ok else "FAIL ") + msg)
    if not ok: fails.append(msg)

async def seo_checks(page, path):
    title = await page.title()
    desc = await page.get_attribute('meta[name="description"]', "content")
    ogt = await page.get_attribute('meta[property="og:title"]', "content")
    ogu = await page.get_attribute('meta[property="og:url"]', "content")
    canon = await page.locator('link[rel="canonical"]').all()
    href = await canon[0].get_attribute("href") if canon else None
    lds = await page.locator('script[type="application/ld+json"]').all_inner_texts()
    check(bool(title), f"{path} title: {title}")
    check(bool(desc) and 50 <= len(desc) <= 170, f"{path} description length {len(desc or '')}")
    check(bool(ogt), f"{path} og:title")
    check(len(canon) == 1 and href and href.startswith("https://") and href == ogu, f"{path} single absolute canonical == og:url ({href})")
    for t in lds: json.loads(t)
    check(len(lds) >= 1, f"{path} JSON-LD parses ({len(lds)} blocks)")
    check(await page.locator("h1").count() == 1, f"{path} exactly one h1")
    check(await page.locator("main").count() == 1 and await page.locator("header").count() >= 1 and await page.locator("footer").count() >= 1, f"{path} landmarks")

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        for name, (w, h) in VIEWPORTS.items():
            ctx = await b.new_context(viewport={"width": w, "height": h})
            page = await ctx.new_page()
            for path in PAGES:
                await page.goto(BASE + path, wait_until="networkidle")
                overflow = await page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
                check(overflow <= 1, f"[{name}] {path} no horizontal overflow ({overflow}px)")
                await page.screenshot(path=str(OUT / f"{name}{path.replace('/', '_') or '_home'}.png"))
                if name == "desktop": await seo_checks(page, path)
            if name == "mobile":
                await page.goto(BASE + "/", wait_until="networkidle")
                btn = page.get_by_role("button", name="Open menu")
                await btn.click()
                check(await page.locator("#mobile-menu").is_visible(), "mobile menu opens")
                check(await page.evaluate("document.body.style.overflow") == "hidden", "mobile menu locks scroll")
                await page.keyboard.press("Escape")
                check(not await page.locator("#mobile-menu").is_visible(), "mobile menu closes on Escape")
                await btn.click(); await page.locator("#mobile-menu").get_by_role("link", name="About").click()
                await page.wait_for_url("**/about")
                check(not await page.locator("#mobile-menu").is_visible(), "mobile menu closes on navigation")
            await ctx.close()

        ctx = await b.new_context(viewport={"width": 1280, "height": 1800}); page = await ctx.new_page()
        await page.goto(BASE + "/", wait_until="networkidle")
        await page.keyboard.press("Tab")
        first = await page.evaluate("document.activeElement.textContent.trim()")
        check("Skip to content" in first, "first Tab focuses skip link")
        outline = await page.evaluate("getComputedStyle(document.activeElement).outlineStyle + '|' + getComputedStyle(document.activeElement).boxShadow")
        check(outline != "none|none", f"skip link has visible focus ({outline[:40]})")
        await page.keyboard.press("Enter")
        check(await page.evaluate("document.activeElement.id") == "main", "skip link moves focus to main")
        mega = page.get_by_role("button", name="Platform")
        await mega.focus(); await page.keyboard.press("Enter")
        check(await mega.get_attribute("aria-expanded") == "true", "mega menu opens with keyboard")
        await page.keyboard.press("Escape")
        check(await mega.get_attribute("aria-expanded") == "false", "mega menu closes on Escape")

        await page.goto(BASE + "/contact", wait_until="networkidle")
        await page.get_by_role("button", name="Request Demo").last.click()
        alert = page.get_by_role("alert").first
        check(await alert.is_visible(), "empty submit shows error summary")
        check(await page.evaluate("document.activeElement.getAttribute('role')") == "alert", "focus moves to error summary")
        check(await page.locator('[aria-invalid="true"]').count() >= 6, "invalid fields flagged aria-invalid")
        await page.locator("form").get_by_label("Name", exact=True).fill("Ada Lovelace"); await page.locator("form").get_by_label("Work email").fill("ada@example.com")
        await page.locator("form").get_by_label("Company", exact=True).fill("Analytical"); await page.locator("form").get_by_label("Job title").fill("DPO")
        await page.locator("form").get_by_label("Company size").select_option(index=1); await page.locator("form").get_by_label("Primary interest").select_option(index=1)
        await page.get_by_role("button", name="Request Demo").last.click()
        check(await page.get_by_role("status").filter(has_text="Thank you").is_visible(), "valid submit shows success state")
        await page.screenshot(path=str(OUT / "contact_success.png"))

        r = await page.request.get(BASE + "/sitemap.xml")
        body = await r.text()
        check(r.ok and "<urlset" in body and body.count("<loc>") >= 30, f"sitemap.xml ok ({body.count('<loc>')} urls)")
        for loc in [l.split("</loc>")[0] for l in body.split("<loc>")[1:]]:
            path = loc.replace("https://secure-your-world-engine.lovable.app", "") or "/"
            s = (await page.request.get(BASE + path)).status
            if s != 200: check(False, f"sitemap url {path} -> {s}")
        check(True, "all sitemap urls checked")
        await b.close()
    print(f"\n{len(fails)} failure(s)"); sys.exit(1 if fails else 0)

asyncio.run(main())
