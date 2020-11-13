import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.77.0/testing/asserts.ts";
import { hmac } from "./mod.ts";
import { encode } from "./deps.ts";

interface TestVector {
  count: number;
  keyByteLength: number;
  macByteLength: number;
  key: Uint8Array;
  msg: Uint8Array;
  mac: Uint8Array;
}

function loadTestVectors(): { [key: string]: TestVector[] } {
  const doc: { [key: string]: any[] } = JSON.parse(
    new TextDecoder().decode(Deno.readFileSync("./test_vectors.json")),
  );

  for (const [k, v] of Object.entries(doc)) {
    doc[k] = v.map(
      ({
        count,
        keyByteLength,
        macByteLength,
        key,
        msg,
        mac,
      }): TestVector => ({
        count,
        keyByteLength,
        macByteLength,
        key: encode(key, "hex"),
        msg: encode(msg, "hex"),
        mac: encode(mac, "hex"),
      }),
    );
  }

  return doc;
}

const testVectors: { [key: string]: TestVector[] } = loadTestVectors();

testVectors["HMAC-SHA1"].forEach(
  (
    { macByteLength, key, msg, mac: expectedMac }: TestVector,
    i: number,
  ): void => {
    Deno.test({
      name: `HMAC-SHA1 ${i}`,
      fn(): void {
        const mac: Uint8Array = hmac("sha1", key, msg) as Uint8Array;
        assertEquals(mac.subarray(0, macByteLength), expectedMac);
      },
    });
  },
);

testVectors["HMAC-SHA256"].forEach(
  (
    { macByteLength, key, msg, mac: expectedMac }: TestVector,
    i: number,
  ): void => {
    Deno.test({
      name: `HMAC-SHA256 ${i}`,
      fn(): void {
        const mac: Uint8Array = hmac("sha256", key, msg) as Uint8Array;
        assertEquals(mac.subarray(0, macByteLength), expectedMac);
      },
    });
  },
);

testVectors["HMAC-SHA512"].forEach(
  (
    { macByteLength, key, msg, mac: expectedMac }: TestVector,
    i: number,
  ): void => {
    Deno.test({
      name: `HMAC-SHA512 ${i}`,
      fn(): void {
        const mac: Uint8Array = hmac("sha512", key, msg) as Uint8Array;
        assertEquals(mac.subarray(0, macByteLength), expectedMac);
      },
    });
  },
);

Deno.test({
  name: `base64 digest encoding uses std base64 - not the urlsafe variant`,
  fn(): void {
    const stdMac: string = hmac(
      "sha512",
      "key",
      "msg",
      "utf8",
      "base64",
    ) as string;
    const urlSafeMac: string = hmac(
      "sha512",
      "key",
      "msg",
      "utf8",
      "base64url",
    ) as string;

    assert(/[+/]/.test(stdMac));
    assert(!/[_-]/.test(stdMac));
    assert(/[_-]/.test(urlSafeMac));
    assert(!/[+/]/.test(urlSafeMac));
  },
});
