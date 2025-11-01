/**
 * Generates a valid KVNR with proper check digit calculation.
 * 
 * @param letter - The starting letter for the KVNR (default: "A")
 * @returns A valid 10-character KVNR string
 */
export function generateKVNR(letter: string = "A"): string {
  // Ensure letter is uppercase and valid
  const normalizedLetter = letter.toUpperCase();
  
  // Validate letter input (must be A-Z, no umlauts)
  if (!/^[A-Z]$/.test(normalizedLetter)) {
    throw new Error("Letter must be a single uppercase letter (A-Z)");
  }
  
  // Generate 8 random digits
  const eightDigits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");
  
  // Calculate check digit
  const checkDigit = calculateKVNRCheckDigit(normalizedLetter, eightDigits);
  
  return `${normalizedLetter}${eightDigits}${checkDigit}`;
}

/**
 * Calculates the check digit for a KVNR using the modified Luhn algorithm.
 * 
 * Implementation based on German specification: https://de.wikipedia.org/wiki/Krankenversichertennummer
 * 
 * @param letter - The first letter of the KVNR (A-Z)
 * @param eightDigits - The 8 random digits (positions 2-9)
 * @returns The calculated check digit (0-9)
 */
function calculateKVNRCheckDigit(letter: string, eightDigits: string): number {
  // Convert letter to two-digit number (A=01, B=02, ..., Z=26)
  const letterValue = letter.charCodeAt(0) - 64; // A=1, B=2, ..., Z=26
  const letterString = letterValue.toString().padStart(2, '0'); // Convert to two digits
  
  // Create the 10-digit base number: letter (2 digits) + 8 random digits
  const baseNumber = letterString + eightDigits;
  
  let sum = 0;
  
  // Apply modified Luhn algorithm
  for (let i = 0; i < baseNumber.length; i++) {
    const digit = parseInt(baseNumber[i], 10);
    
    // Alternate weights: 1-2-1-2-1-2-1-2-1-2 (from left to right)
    const weight = (i % 2 === 0) ? 1 : 2;
    
    // Multiply digit by weight
    const product = digit * weight;
    
    // Calculate cross sum (digit sum) of the product
    // For products >= 10, we need to sum the digits (e.g., 12 -> 1+2 = 3)
    const crossSum = product >= 10 ? Math.floor(product / 10) + (product % 10) : product;
    
    sum += crossSum;
  }
  
  // Return the last digit of the sum (sum modulo 10)
  return sum % 10;
}