# hmac

![ci](https://github.com/chiefbiiko/hmac/workflows/ci/badge.svg)

## Usage

``` ts
import { hmac } from "https://denopkg.com/chiefbiiko/hmac/mod.ts";

console.log("HMAC-SHA256 example", hmac("sha256", "key", "msg", "utf8", "hex"));
```

## API

#### `hmac(hash: Hash, key: string | Uint8Array, msg: string | Uint8Array, inputEncoding?: string, outputEncoding?: string): string | Uint8Array`

Convenience function for macing singular data. If `key` or `msg` is a string, `inputEncoding` can be one of `"utf8"` (fallback), `"hex"`, or `"base64"`. `key` and `msg` must have the same encoding if they are both strings.

#### `new HMAC(hasher: _Hash, key?: string | Uint8Array)`

Creates a `HMAC` instance. If you pass a `key` the instance gets initialized. See below for a definition of the `Hash` interface.

#### `HMAC#init(key: string | Uint8Array, inputEncoding?: string): HMAC`

Initializes a `HMAC` instance. If `key` is a string, `inputEncoding` can be one of `"utf8"` (fallback), `"hex"`, or `"base64"`.

#### `HMAC#update(msg: string | Uint8Array, inputEncoding?: string): HMAC`

Updates the instance with a message block. If `msg` is a string, `inputEncoding` can be one of `"utf8"` (fallback), `"hex"`, or `"base64"`.

#### `HMAC#digest(outputEncoding?: string): string | Uint8Array `

Obtain a hash based message authentication tag.

#### `enum Hash`

This enum contains all valid Hash types.

``` ts
export enum Hash {
  SHA1,
  SHA256,
  SHA512
}
```

#### `interface _Hash`

A generic representation of a hash algorithm implementation.

``` ts
export interface _Hash {
  hashSize: number;
  init(): _Hash;
  update(msg: string | Uint8Array, inputEncoding?: string): _Hash;
  digest(outputEncoding?: string): string | Uint8Array;
}
```

## License

[MIT](./LICENSE)
