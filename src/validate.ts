/**
 * Validates a KVNR string based on basic format only.
 * 
 * @param kvnr - The KVNR string to validate
 * @returns true if format is correct, false otherwise
 */
export function isValidKVNR(kvnr: string): boolean {
  const normalized = kvnr.trim().toUpperCase();
  const regex = /^[A-Z][0-9]{9}$/;
  return regex.test(normalized);
}