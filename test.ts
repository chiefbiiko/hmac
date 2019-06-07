import { test, runIfMain } from "https://deno.land/x/testing/mod.ts";
import { assertEquals } from "https://deno.land/x/testing/asserts.ts";
import { hmac } from "./mod.ts";

interface TestVector {
  count: number;
  keyByteLength: number;
  macByteLength: number;
  key: Uint8Array;
  msg: Uint8Array;
  mac: Uint8Array;
}

function hex2buf(hex: string): Uint8Array {
  const len: number = hex.length;
  if (len % 2 || !/^[0-9a-fA-F]*$/.test(hex)) {
    throw new TypeError("Invalid hex string.");
  }
  hex = hex.toLowerCase();
  const buf: Uint8Array = new Uint8Array(Math.floor(len / 2));
  const end: number = len / 2;
  for (let i: number = 0; i < end; ++i) {
    buf[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return buf;
}

function loadTestVectors(): { [key: string]: TestVector[] } {
  const doc: { [key: string]: any[] } = JSON.parse(
    new TextDecoder().decode(Deno.readFileSync("./test_vectors.json"))
  );
  for (const [k, v] of Object.entries(doc)) {
    doc[k] = v.map(
      ({ count, keyByteLength, macByteLength, key, msg, mac }): TestVector => ({
        count,
        keyByteLength,
        macByteLength,
        key: hex2buf(key),
        msg: hex2buf(msg),
        mac: hex2buf(mac)
      })
    );
  }
  return doc;
}

const testVectors: { [key: string]: TestVector[] } = loadTestVectors();

testVectors["HMAC-SHA1"].forEach(
  (
    { macByteLength, key, msg, mac: expectedMac }: TestVector,
    i: number
  ): void => {
    test({
      name: `HMAC-SHA1 ${i}`,
      fn(): void {
        const mac: Uint8Array = hmac("sha1", key, msg);
        assertEquals(mac.subarray(0, macByteLength), expectedMac);
      }
    });
  }
);

testVectors["HMAC-SHA256"].forEach(
  (
    { macByteLength, key, msg, mac: expectedMac }: TestVector,
    i: number
  ): void => {
    test({
      name: `HMAC-SHA256 ${i}`,
      fn(): void {
        const mac: Uint8Array = hmac("sha256", key, msg);
        assertEquals(mac.subarray(0, macByteLength), expectedMac);
      }
    });
  }
);

testVectors["HMAC-SHA512"].forEach(
  (
    { macByteLength, key, msg, mac: expectedMac }: TestVector,
    i: number
  ): void => {
    test({
      name: `HMAC-SHA512 ${i}`,
      fn(): void {
        const mac: Uint8Array = hmac("sha512", key, msg);
        assertEquals(mac.subarray(0, macByteLength), expectedMac);
      }
    });
  }
);

runIfMain(import.meta, { parallel: true });
