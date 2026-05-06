import { NextRequest, NextResponse } from "next/server";
import { getLicense, activateLicense } from "@/lib/db";
import { isValidKeyFormat } from "@/lib/license";

// POST /api/license/validate
// Called by the ClipFury app to verify and activate a license key
// Body: { key: string, machineId: string }
export async function POST(req: NextRequest) {
  const { key, machineId } = await req.json();

  if (!key || !machineId) {
    return NextResponse.json({ valid: false, error: "Missing key or machine ID" }, { status: 400 });
  }

  // Check format first before hitting the DB
  if (!isValidKeyFormat(key)) {
    return NextResponse.json({ valid: false, error: "Invalid key format" });
  }

  const license = await getLicense(key.trim().toUpperCase());

  if (!license) {
    return NextResponse.json({ valid: false, error: "License key not found" });
  }

  // Key already activated on a different machine
  if (license.machine_id && license.machine_id !== machineId) {
    return NextResponse.json({
      valid:   false,
      error:   "This key is already activated on another device. Contact support to transfer.",
    });
  }

  // First activation — bind to this machine
  if (!license.machine_id) {
    await activateLicense(key.trim().toUpperCase(), machineId);
  }

  return NextResponse.json({
    valid:    true,
    plan:     license.plan,
    founder:  license.founder,
    email:    license.email,
  });
}
