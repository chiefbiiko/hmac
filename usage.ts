import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts";

console.log(
  "HMAC-SHA256 example",
  hmac("sha256", "key", "msg", "utf8", "hex")
);
