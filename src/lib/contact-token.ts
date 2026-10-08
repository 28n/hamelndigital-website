import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Stateless signed timestamp for the contact form time-trap.
 *
 * The secret comes from FORM_TOKEN_SECRET. If it is not configured, a random
 * per-process secret is used — tokens simply stop validating after a restart,
 * which is acceptable for a single-container deployment.
 */
const secret =
  process.env.FORM_TOKEN_SECRET ?? randomBytes(32).toString("hex");

const MIN_FILL_MS = 2_500;
const MAX_AGE_MS = 2 * 60 * 60 * 1_000;

function sign(timestamp: string): string {
  return createHmac("sha256", secret).update(timestamp).digest("hex");
}

export function issueToken() {
  const ts = Date.now().toString();
  return { ts, sig: sign(ts) };
}

export function verifyToken(ts: string | null, sig: string | null): boolean {
  if (!ts || !sig || !/^\d+$/.test(ts)) return false;

  const expected = Buffer.from(sign(ts), "hex");
  const received = Buffer.from(sig, "hex");
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return false;
  }

  const age = Date.now() - Number(ts);
  return age >= MIN_FILL_MS && age <= MAX_AGE_MS;
}
