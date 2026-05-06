import crypto from "crypto";

// Generates a license key in the format: CF-XXXX-XXXX-XXXX-XXXX
// CF prefix identifies it as ClipFury, easy to recognize and support
export function generateLicenseKey(): string {
  const segments = Array.from({ length: 4 }, () =>
    crypto.randomBytes(2).toString("hex").toUpperCase()
  );
  return `CF-${segments.join("-")}`;
}

// Basic format check before hitting the database
export function isValidKeyFormat(key: string): boolean {
  return /^CF-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}$/.test(
    key.trim().toUpperCase()
  );
}
