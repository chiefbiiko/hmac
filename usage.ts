import { hmac, Hash } from "https://denopkg.com/chiefbiiko/hmac@v2.0.0/mod.ts"";

console.log(
  "HMAC-SHA256 example",
  hmac(Hash.SHA256, "key", "msg", "utf8", "hex")
);
