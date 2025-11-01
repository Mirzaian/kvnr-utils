/**
 * Normalizes a KVNR string by trimming whitespace and converting to uppercase.
 * 
 * @param kvnr - The raw KVNR string
 * @returns Normalized KVNR string
 */
export function normalizeKVNR(kvnr: string): string {
  return kvnr.trim().toUpperCase();
}