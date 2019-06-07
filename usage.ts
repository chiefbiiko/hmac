import { hmac } from "https://denopkg.com/chiefbiiko/hmac/mod.ts";

const key: Uint8Array = new Uint8Array(32).fill(99)
const msg: Uint8Array = new Uint8Array(128).fill(77)

// the simple way
const mac: Uint8Array = hmac("sha256", key, msg);

console.log(`key ${key}, msg ${msg} -> mac ${mac}`)
