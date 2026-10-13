# Manual QA checklist — Home, Solutions, About, Contact

Run on phone (375px), tablet (768px) and desktop (1280px+). Automated version: `python3 qa/site_checks.py`.

## Layout
- [ ] No sideways scrolling; text never clipped; tap targets at least 44px.
- [ ] Hero visuals scale and stay legible; reduced-motion setting stops animation.

## Mobile menu
- [ ] Menu button opens the menu; page behind does not scroll.
- [ ] Each section expands; links navigate and the menu closes.
- [ ] Escape and the close button both close it.

## Keyboard
- [ ] First Tab shows "Skip to content"; Enter jumps to main content.
- [ ] Every link/button shows a clear focus ring; order follows reading order.
- [ ] Mega menus open with Enter/Space, close with Escape and on outside click.
- [ ] Privacy Lens tabs switch with arrow keys.

## Contact form
- [ ] Empty submit: error summary appears and receives focus; each link jumps to its field.
- [ ] Invalid email shows a specific message; errors announced by screen reader.
- [ ] Valid submit shows loading, then success; "Submit another request" resets.

## Sharing & indexing
- [ ] Paste each page URL into a link-preview debugger: correct title and description.
- [ ] /sitemap.xml lists every page; /robots.txt references it; /insights is noindex.

## Consent
- [ ] Banner appears on first visit; "Essential only" records nothing on /insights.
- [ ] "Allow analytics" then clicking CTAs / submitting form increments /insights counts.
