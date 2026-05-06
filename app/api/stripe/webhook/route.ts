import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createLicense, incrementFounderCount } from "@/lib/db";
import { generateLicenseKey } from "@/lib/license";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Disable body parsing so we can verify the raw Stripe signature
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
    const session  = event.data.object as Stripe.Checkout.Session;
    const email    = session.customer_email!;
    const isFounder = session.metadata?.founder === "true";

    // Generate a unique license key
    const key = generateLicenseKey();

    // Store in database
    await createLicense({
      key,
      email,
      founder: isFounder,
      stripeSessionId: session.id,
    });

    // Increment founder count if applicable
    if (isFounder) await incrementFounderCount();

    // Send the key by email
    await sendLicenseEmail(email, key, isFounder);

    console.log(`License issued: ${key} → ${email} (founder: ${isFounder})`);
  }

  return NextResponse.json({ received: true });
}

async function sendLicenseEmail(email: string, key: string, isFounder: boolean) {
  // Using Resend for transactional email — simple API, free tier covers early stage
  const res = await fetch("https://api.resend.com/emails", {
    method:  "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type":  "application/json",
    },
    body: JSON.stringify({
      from:    "ClipFury <noreply@clipfury.net>",
      to:      email,
      subject: isFounder
        ? "🔥 Your ClipFury Pro Founder's Key is here"
        : "Your ClipFury Pro License Key",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:white;padding:40px;border-radius:12px;">
          <div style="font-size:2rem;font-weight:900;letter-spacing:4px;margin-bottom:8px;background:linear-gradient(135deg,#fff,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
            CLIPFURY
          </div>
          ${isFounder ? `
          <div style="background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.3);border-radius:8px;padding:10px 16px;margin-bottom:24px;font-size:0.85rem;color:#a78bfa;letter-spacing:1px;">
            ⚡ FOUNDER'S EDITION — Thank you for being one of the first 100
          </div>` : ""}
          <h2 style="font-size:1.4rem;font-weight:700;margin-bottom:16px;">Your Pro License Key</h2>
          <p style="color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:24px;">
            Thank you for upgrading to ClipFury Pro. Your license key is below.
            Copy it and enter it in the app under <strong style="color:white;">Settings → Pro</strong>.
          </p>

          <div style="background:#111;border:1px solid rgba(124,58,237,0.4);border-radius:8px;padding:20px;text-align:center;margin-bottom:24px;">
            <div style="font-size:0.7rem;color:rgba(255,255,255,0.3);letter-spacing:2px;margin-bottom:8px;">YOUR LICENSE KEY</div>
            <div style="font-family:monospace;font-size:1.4rem;font-weight:700;letter-spacing:3px;color:#a78bfa;">
              ${key}
            </div>
          </div>

          <div style="background:rgba(255,255,255,0.03);border-radius:8px;padding:16px;margin-bottom:24px;">
            <div style="font-size:0.75rem;font-weight:700;color:rgba(255,255,255,0.4);letter-spacing:2px;margin-bottom:10px;">HOW TO ACTIVATE</div>
            <ol style="color:rgba(255,255,255,0.6);font-size:0.875rem;line-height:2;padding-left:20px;">
              <li>Open ClipFury</li>
              <li>Right-click the tray icon → Settings</li>
              <li>Click the <strong style="color:white;">Pro</strong> tab</li>
              <li>Paste your key and click Activate</li>
            </ol>
          </div>

          <p style="color:rgba(255,255,255,0.3);font-size:0.8rem;line-height:1.6;">
            This key activates on 1 device. Keep it safe — it cannot be recovered if lost.
            Questions? Email <a href="mailto:m.snapfury@gmail.com" style="color:#a78bfa;">m.snapfury@gmail.com</a>
          </p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Failed to send license email:", err);
  }
}
