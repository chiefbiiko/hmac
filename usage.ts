import { hmac, HashType } from "./mod";

console.log(
  "HMAC-SHA256 example",
  hmac(HashType.SHA256, "key", "msg", "utf8", "hex")
);
