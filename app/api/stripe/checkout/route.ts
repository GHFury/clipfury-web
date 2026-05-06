import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getFounderCount } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const FOUNDER_LIMIT = 100;
const FOUNDER_PRICE = process.env.STRIPE_FOUNDER_PRICE_ID!; // $8 one-time
const REGULAR_PRICE = process.env.STRIPE_REGULAR_PRICE_ID!; // $15 one-time

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Decide which price to use based on founder count
    const founderCount = await getFounderCount();
    const isFounder    = founderCount < FOUNDER_LIMIT;
    const priceId      = isFounder ? FOUNDER_PRICE : REGULAR_PRICE;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode:                 "payment",
      customer_email:       email || undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pro/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_SITE_URL}/#pricing`,
      metadata: {
        founder:       isFounder ? "true" : "false",
        founder_count: String(founderCount),
      },
    });

    return NextResponse.json({ url: session.url, isFounder, founderCount });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
