# hmac

![ci](https://github.com/chiefbiiko/hmac/workflows/ci/badge.svg)

## Usage

``` ts
import { hmac } from "https://denopkg.com/chiefbiiko/hmac/mod.ts";

console.log("HMAC-SHA256 example", hmac("sha256", "key", "msg", "utf8", "hex"));
```

## API

#### `hmac(hash: string, key: string | Uint8Array, msg: string | Uint8Array, inputEncoding?: string, outputEncoding?: string): string | Uint8Array`

Convenience function for macing singular data. `hash` should be one of `"sha1"`, `"sha256"`, or `"sha512"`, with the last two representing the respective SHA2 variants. If `key` or `msg` is a string, `inputEncoding` can be one of `"utf8"` (fallback), `"hex"`, or `"base64"`. `key` and `msg` must have the same encoding if they are both strings.

#### `new HMAC(hasher: Hash, key?: string | Uint8Array)`

Creates a `HMAC` instance. If you pass a `key` the instance gets initialized. See below for a definition of the `Hash` interface.

#### `HMAC#init(key: string | Uint8Array, inputEncoding?: string): HMAC`

Initializes a `HMAC` instance. If `key` is a string, `inputEncoding` can be one of `"utf8"` (fallback), `"hex"`, or `"base64"`.

#### `HMAC#update(msg: string | Uint8Array, inputEncoding?: string): HMAC`

Updates the instance with a message block. If `msg` is a string, `inputEncoding` can be one of `"utf8"` (fallback), `"hex"`, or `"base64"`.

#### `HMAC#digest(outputEncoding?: string): string | Uint8Array `

Obtain a hash based message authentication tag.

#### `interface Hash`

A generic representation of a hash algorithm implementation.

``` ts
export interface Hash {
  hashSize: number;
  init(): Hash;
  update(msg: string | Uint8Array, inputEncoding?: string): Hash;
  digest(outputEncoding?: string): string | Uint8Array;
}
```

## License

[MIT](./LICENSE)
