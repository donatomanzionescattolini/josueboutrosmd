/** Join class names, dropping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Current postgraduate year, derived from the residency start year.
 *
 * Residency academic years run July 1 → June 30, so a resident who began in
 * July 2024 is PGY-1 until June 30 2025, PGY-2 from July 1 2025, and so on.
 * Returns `null` before the program starts or after it ends, so the site never
 * advertises a stale or impossible level.
 */
export function currentPgy(
  startYear: number,
  endYear: number,
  now: Date = new Date(),
): number | null {
  const JULY = 6; // Date month index for July
  const academicYear =
    now.getMonth() >= JULY ? now.getFullYear() : now.getFullYear() - 1;
  const level = academicYear - startYear + 1;
  const totalYears = endYear - startYear;
  if (level < 1 || level > totalYears) return null;
  return level;
}

/** "2024 — 2027" from a start and end year. */
export function formatYearRange(startYear: number, endYear: number): string {
  return `${startYear} — ${endYear}`;
}

/** Basic, deliberately permissive email shape check. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
