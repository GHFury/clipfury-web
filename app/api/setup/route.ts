import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";

// One-time setup endpoint — creates the licenses table
// Protected by a setup secret so it can't be called by anyone else
// Call once: GET https://clipfury.net/api/setup?secret=YOUR_SETUP_SECRET
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initDB();
    return NextResponse.json({ ok: true, message: "Database initialized — licenses table ready" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
