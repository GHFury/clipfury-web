import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createLicense, incrementFounderCount } from "@/lib/db";
import { generateLicenseKey } from "@/lib/license";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const body      = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid") {
      console.log("Session not paid yet, skipping:", session.payment_status);
      return NextResponse.json({ received: true });
    }

    const email = session.customer_email || session.customer_details?.email;

    if (!email) {
      console.error("No email found in session:", session.id);
      return NextResponse.json({ received: true });
    }

    const isFounder = session.metadata?.founder === "true";
    console.log("Processing completed payment for:", email, "founder:", isFounder);

    const key = generateLicenseKey();

    await createLicense({ key, email, founder: isFounder, stripeSessionId: session.id });
    if (isFounder) await incrementFounderCount();
    await sendLicenseEmail(email, key, isFounder);

    console.log(`License issued: ${key} to ${email} (founder: ${isFounder})`);
  }

  return NextResponse.json({ received: true });
}

async function sendLicenseEmail(email: string, key: string, isFounder: boolean) {
  console.log("Sending email to:", email);

  const subject = isFounder
    ? "Your ClipFury Pro Founder's Key is here"
    : "Your ClipFury Pro License Key";

  const founderBadge = isFounder ? `
    <tr>
      <td style="padding:0 40px 20px;">
        <div style="background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.4);border-radius:6px;padding:10px 16px;">
          <p style="margin:0;font-size:13px;color:#a78bfa;letter-spacing:1px;font-weight:600;">
            FOUNDER'S EDITION &mdash; Thank you for being one of the first 100
          </p>
        </div>
      </td>
    </tr>` : "";

  const steps = ["Open ClipFury", "Right-click the tray icon &rarr; Settings", "Click the Pro tab", "Paste your key and click Activate"];

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

  <!-- HEADER -->
  <tr>
    <td style="background:#0a0a0a;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;border-bottom:1px solid rgba(124,58,237,0.3);">
      <img src="https://www.clipfury.net/logo.JPEG" alt="ClipFury" width="80" height="80"
        style="border-radius:50%;border:2px solid rgba(124,58,237,0.5);display:block;margin:0 auto 16px;"/>
      <p style="margin:0;font-size:28px;font-weight:900;letter-spacing:6px;color:white;">CLIPFURY</p>
      <p style="margin:6px 0 0;font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:2px;">AUTOMATIC MOMENT CAPTURE</p>
    </td>
  </tr>

  <!-- TITLE -->
  <tr>
    <td style="background:#111118;padding:32px 40px 20px;">
      <h2 style="margin:0 0 12px;font-size:22px;font-weight:700;color:white;">Your Pro License Key</h2>
      <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.55);line-height:1.7;">
        Thank you for upgrading to ClipFury Pro. Your license key is below.
        Copy it and enter it in the app under <strong style="color:white;">Settings &rarr; Pro</strong>.
      </p>
    </td>
  </tr>

  ${founderBadge}

  <!-- KEY BOX -->
  <tr>
    <td style="background:#111118;padding:0 40px 28px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid rgba(124,58,237,0.4);border-radius:8px;">
        <tr>
          <td style="padding:24px;text-align:center;">
            <p style="margin:0 0 10px;font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:3px;text-transform:uppercase;">Your License Key</p>
            <p style="margin:0;font-family:'Courier New',monospace;font-size:22px;font-weight:700;letter-spacing:4px;color:#a78bfa;">${key}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- HOW TO ACTIVATE -->
  <tr>
    <td style="background:#111118;padding:0 40px 28px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;">
        <tr>
          <td style="padding:20px;">
            <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:rgba(255,255,255,0.3);letter-spacing:3px;text-transform:uppercase;">How to Activate</p>
            <table cellpadding="0" cellspacing="0">
              ${steps.map((step, i) => `
              <tr>
                <td style="padding:5px 12px 5px 0;vertical-align:top;">
                  <div style="width:22px;height:22px;border-radius:50%;background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.4);text-align:center;line-height:22px;font-size:11px;color:#a78bfa;font-weight:700;">${i + 1}</div>
                </td>
                <td style="padding:5px 0;font-size:14px;color:rgba(255,255,255,0.6);line-height:1.5;">${step}</td>
              </tr>`).join("")}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td style="background:#111118;border-radius:0 0 12px 12px;padding:0 40px 28px;border-top:1px solid rgba(255,255,255,0.06);">
      <p style="margin:20px 0 0;font-size:13px;color:rgba(255,255,255,0.25);line-height:1.7;">
        This key activates on 1 device. Keep it safe &mdash; it cannot be recovered if lost.<br/>
        Questions? Email <a href="mailto:m.snapfury@gmail.com" style="color:#a78bfa;text-decoration:none;">m.snapfury@gmail.com</a>
      </p>
    </td>
  </tr>

  <!-- BOTTOM -->
  <tr>
    <td style="padding:20px 0;text-align:center;">
      <p style="margin:0;font-size:12px;color:#999;">
        ClipFury &middot; <a href="https://clipfury.net" style="color:#999;text-decoration:none;">clipfury.net</a>
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method:  "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type":  "application/json",
    },
    body: JSON.stringify({ from: "ClipFury <noreply@clipfury.net>", to: email, subject, html }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Failed to send license email:", err);
  } else {
    const success = await res.json();
    console.log("Email sent successfully:", success);
  }
}
