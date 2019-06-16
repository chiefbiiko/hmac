# hmac

[![Travis](http://img.shields.io/travis/chiefbiiko/hmac.svg?style=flat)](http://travis-ci.org/chiefbiiko/hmac) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/chiefbiiko/hmac?branch=master&svg=true)](https://ci.appveyor.com/project/chiefbiiko/hmac)

## Usage

``` ts
import { hmac } from "https://denopkg.com/chiefbiiko/hmac/mod.ts";

console.log("HMAC-SHA256 example", hmac("sha256", "key", "msg", "utf8", "hex"));
```

## API

Prep: a generic representation of a hash algorithm implementation.

``` ts
export interface Hash {
  hashSize: number;
  init(): Hash;
  update(msg: string | Uint8Array, inputEncoding?: string): Hash;
  digest(outputEncoding?: string): string | Uint8Array;
}
```

#### `new HMAC(hasher: Hash, key?: string | Uint8Array)`

Creates a `HMAC` instance. If you pass a `key` the instance gets initialized.

#### `HMAC#init(key: Uint8Array, inputEncoding?: string): HMAC`

Initializes a `HMAC` instance. `inputEncoding` can be one of `"utf8"`, `"hex"`, or `"base64"`.

#### `HMAC#update(msg: string | Uint8Array, inputEncoding?: string): HMAC`

Updates the instance with a message block. `inputEncoding` can be one of `"utf8"`, `"hex"`, or `"base64"`.

#### `HMAC#digest(outputEncoding?: string): string | Uint8Array `

Obtain a hash based message authentication tag.

#### `hmac(hash: string, key: string | Uint8Array, msg: string | Uint8Array, inputEncoding?: string, outputEncoding?: string): string | Uint8Array`
Convenience function for macing singular data. `hash` should be one of `"sha1"`, `"sha256"`, or `"sha512"`, with the last two representing the respective SHA2 variants. `key` and `msg` must have the same encoding if they are strings.

## License

[MIT](./LICENSE)
