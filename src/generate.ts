/**
 * Generates a KVNR with basic random digits (no check digit calculation).
 * 
 * @param letter - The starting letter for the KVNR (default: "A")
 * @returns A 10-character KVNR string
 */
export function generateKVNR(letter: string = "A"): string {
  letter = letter.toUpperCase();
  const numbers = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("");
  return `${letter}${numbers}`;
}