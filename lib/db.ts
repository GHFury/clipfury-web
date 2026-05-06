import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Run once to create the licenses table
export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS licenses (
      id           SERIAL PRIMARY KEY,
      key          TEXT UNIQUE NOT NULL,
      email        TEXT NOT NULL,
      plan         TEXT NOT NULL DEFAULT 'pro',
      founder      BOOLEAN NOT NULL DEFAULT false,
      activated_at TIMESTAMP,
      machine_id   TEXT,
      created_at   TIMESTAMP DEFAULT NOW(),
      stripe_session_id TEXT
    )
  `;

  // Track founder count separately
  await sql`
    CREATE TABLE IF NOT EXISTS license_meta (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `;

  await sql`
    INSERT INTO license_meta (key, value)
    VALUES ('founder_count', '0')
    ON CONFLICT (key) DO NOTHING
  `;
}

export async function getFounderCount(): Promise<number> {
  const rows = await sql`
    SELECT value FROM license_meta WHERE key = 'founder_count'
  `;
  return parseInt(rows[0]?.value ?? "0");
}

export async function incrementFounderCount() {
  await sql`
    UPDATE license_meta
    SET value = (value::int + 1)::text
    WHERE key = 'founder_count'
  `;
}

export async function createLicense(data: {
  key: string;
  email: string;
  founder: boolean;
  stripeSessionId: string;
}) {
  await sql`
    INSERT INTO licenses (key, email, founder, stripe_session_id)
    VALUES (${data.key}, ${data.email}, ${data.founder}, ${data.stripeSessionId})
  `;
}

export async function getLicense(key: string) {
  const rows = await sql`
    SELECT * FROM licenses WHERE key = ${key}
  `;
  return rows[0] ?? null;
}

export async function activateLicense(key: string, machineId: string) {
  await sql`
    UPDATE licenses
    SET machine_id = ${machineId}, activated_at = NOW()
    WHERE key = ${key}
  `;
}

export { sql };
