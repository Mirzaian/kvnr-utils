import { isValidKVNR, normalizeKVNR, generateKVNR } from "../src";

test("valid KVNR format", () => {
  expect(isValidKVNR("A123456789")).toBe(true);
});

test("invalid KVNR format", () => {
  expect(isValidKVNR("123456789")).toBe(false); // Missing letter
  expect(isValidKVNR("A12345678")).toBe(false); // Too short
  expect(isValidKVNR("A12345678A")).toBe(false); // Wrong format
});

test("normalize KVNR", () => {
  expect(normalizeKVNR(" a123456789 ")).toBe("A123456789");
});

test("generate KVNR", () => {
  const kvnr = generateKVNR("B");
  expect(kvnr).toMatch(/^B\d{9}$/);
});