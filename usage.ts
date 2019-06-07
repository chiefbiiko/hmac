import { hmac } from "https://denopkg.com/chiefbiiko/hmac/mod.ts";

const key: string = "fraud";
const msg: string = "money";

// the simple way
const mac: Uint8Array = hmac("sha256", key, msg);

console.log(`key ${key}, msg ${msg} -> mac ${mac}`);
