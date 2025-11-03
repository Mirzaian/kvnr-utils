import { isValidKVNR, normalizeKVNR } from "../src";

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