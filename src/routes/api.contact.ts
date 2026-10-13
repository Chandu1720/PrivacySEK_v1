import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "ymail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "zoho.com",
  "mail.com",
  "gmx.com",
  "yandex.com",
]);

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z
    .string()
    .trim()
    .email("Enter a valid work email")
    .max(255)
    .refine(
      (val) => {
        const domain = val.toLowerCase().split("@")[1]?.trim() ?? "";
        return !FREE_EMAIL_DOMAINS.has(domain);
      },
      (val) => {
        const domain = val.toLowerCase().split("@")[1]?.trim() ?? "";
        if (domain === "gmail.com" || domain === "googlemail.com") {
          return { message: "Please enter a corporate work email (@gmail.com is not accepted)" };
        }
        return { message: "Please use your corporate work email (personal email domains are not accepted)" };
      },
    ),
  company: z.string().trim().min(2, "Enter your company name").max(120),
  title: z.string().trim().min(2, "Enter your job title").max(120),
  size: z.string().min(1, "Select a company size"),
  interest: z.string().min(1, "Select a primary interest"),
  message: z.string().trim().max(2000, "Keep your message under 2000 characters").optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export const TARGET_SALES_EMAIL = "sales@privacsek.com";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = contactSchema.safeParse(body);

          if (!parsed.success) {
            const errors: Record<string, string> = {};
            parsed.error.issues.forEach((issue) => {
              const key = String(issue.path[0]);
              errors[key] = issue.message;
            });
            return new Response(
              JSON.stringify({ success: false, errors, message: "Validation failed" }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          const data = parsed.data;
          const timestamp = new Date().toISOString();

          // Server notification record formatted for sales@privacsek.com
          const emailRecord = {
            to: TARGET_SALES_EMAIL,
            from: "notifications@privacsek.com",
            replyTo: data.email,
            subject: `[New Lead] Demo Request from ${data.company} - ${data.name}`,
            timestamp,
            lead: {
              name: data.name,
              workEmail: data.email,
              company: data.company,
              jobTitle: data.title,
              companySize: data.size,
              interest: data.interest,
              message: data.message || "No specific message provided",
            },
          };

          // Forward to configured external webhook or Resend/SendGrid if set
          const webhookUrl =
            process.env.LEAD_WEBHOOK_URL ||
            process.env.VITE_ACCESS_REQUEST_ENDPOINT;

          if (webhookUrl) {
            try {
              await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emailRecord),
              });
            } catch (err) {
              console.error("External webhook forward failed:", err);
            }
          }

          // Optional Resend email dispatch if RESEND_API_KEY is configured
          if (process.env.RESEND_API_KEY) {
            try {
              await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  from: "PrivacySEK Leads <onboarding@resend.dev>",
                  to: [TARGET_SALES_EMAIL],
                  reply_to: data.email,
                  subject: emailRecord.subject,
                  text: `New Demo Request\n\nName: ${data.name}\nWork Email: ${data.email}\nCompany: ${data.company}\nTitle: ${data.title}\nSize: ${data.size}\nInterest: ${data.interest}\nMessage: ${data.message || "N/A"}\nSubmitted At: ${timestamp}`,
                }),
              });
            } catch (err) {
              console.error("Resend email dispatch failed:", err);
            }
          }

          console.log(`[LEAD DISPATCH -> ${TARGET_SALES_EMAIL}]`, JSON.stringify(emailRecord, null, 2));

          return new Response(
            JSON.stringify({
              success: true,
              recipient: TARGET_SALES_EMAIL,
              lead: emailRecord.lead,
              message: `Response received and routed to ${TARGET_SALES_EMAIL}`,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (err) {
          console.error("Error processing contact submission:", err);
          return new Response(
            JSON.stringify({ success: false, message: "Internal server error" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
    },
  },
});
