/**
 * Validates a German Health Insurance Number (KVNR) using the official specification.
 * 
 * Validates format (Letter + 8 digits + 1 check digit) and verifies the check digit
 * using the modified Luhn algorithm as specified in:
 * https://de.wikipedia.org/wiki/Krankenversichertennummer
 * 
 * @param kvnr - The KVNR string to validate
 * @returns true if the KVNR is valid, false otherwise
 */
export function isValidKVNR(kvnr: string): boolean {
  // Normalize input: remove whitespace and convert to uppercase
  const normalized = kvnr.trim().toUpperCase();
  
  // Check basic format: Letter + 9 digits (8 random + 1 check digit)
  const kvnrMatch = normalized.match(/^([A-Z])([0-9]{8})([0-9])$/);
  if (!kvnrMatch) {
    return false;
  }

  const letter = kvnrMatch[1];
  const eightDigits = kvnrMatch[2];
  const providedCheckDigit = parseInt(kvnrMatch[3], 10);

  // Convert letter to two-digit number (A=01, B=02, ..., Z=26)
  const letterValue = letter.charCodeAt(0) - 64; // A=1, B=2, ..., Z=26
  const letterString = letterValue.toString().padStart(2, '0'); // Convert to two digits

  // Create the 10-digit base number: letter (2 digits) + 8 random digits
  const baseNumber = letterString + eightDigits;

  // Calculate check digit using modified Luhn algorithm
  const calculatedCheckDigit = calculateLuhnCheckDigit(baseNumber);

  // Verify that calculated check digit matches the provided one
  return calculatedCheckDigit === providedCheckDigit;
}

/**
 * Calculates the check digit using the modified Luhn algorithm for KVNR.
 * 
 * @param numberString - A 10-digit string (letter converted to 2 digits + 8 random digits)
 * @returns The calculated check digit (0-9)
 */
function calculateLuhnCheckDigit(numberString: string): number {
  let sum = 0;
  
  for (let i = 0; i < numberString.length; i++) {
    const digit = parseInt(numberString[i], 10);
    
    // Alternate weights: 1-2-1-2-1-2-1-2-1-2
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