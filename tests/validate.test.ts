import { isValidKVNR, normalizeKVNR, generateKVNR } from "../src";

test("valid KVNR (Wikipedia example)", () => {
  // Example from https://de.wikipedia.org/wiki/Krankenversichertennummer
  // A123456780 has the correct check digit (0) according to the calculation shown
  expect(isValidKVNR("A123456780")).toBe(true);
});

test("invalid KVNR format", () => {
  expect(isValidKVNR("123456789")).toBe(false); // Missing letter
  expect(isValidKVNR("A12345678")).toBe(false); // Too short
  expect(isValidKVNR("A12345678A")).toBe(false); // Wrong check digit format
});

test("invalid KVNR check digit", () => {
  expect(isValidKVNR("A123456789")).toBe(false); // Wrong check digit
});

test("normalize KVNR", () => {
  expect(normalizeKVNR(" a123456780 ")).toBe("A123456780");
});

test("generate KVNR", () => {
  const kvnr = generateKVNR("B");
  expect(kvnr).toMatch(/^B\d{9}$/);
  // Verify that generated KVNR is actually valid
  expect(isValidKVNR(kvnr)).toBe(true);
});

test("generate KVNR with different letters", () => {
  const letters = ["A", "B", "C", "X", "Y", "Z"];
  letters.forEach(letter => {
    const kvnr = generateKVNR(letter);
    expect(kvnr.charAt(0)).toBe(letter);
    expect(isValidKVNR(kvnr)).toBe(true);
  });
});