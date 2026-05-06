import { NextResponse } from "next/server";
import { getFounderCount } from "@/lib/db";

const FOUNDER_LIMIT = 100;

// GET /api/license/founder-count
// Used by the pricing section to show remaining founder slots
export async function GET() {
  const count     = await getFounderCount();
  const remaining = Math.max(0, FOUNDER_LIMIT - count);
  return NextResponse.json({ count, remaining, limit: FOUNDER_LIMIT });
}
