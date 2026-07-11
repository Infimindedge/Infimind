/** Converts an ISO 3166-1 alpha-2 code (e.g. "GB") into a flag emoji (🇬🇧). */
export function isoToFlagEmoji(isoCode: string): string {
  if (!/^[A-Za-z]{2}$/.test(isoCode)) return '';
  return isoCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
