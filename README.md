# hmac

[![Travis](http://img.shields.io/travis/chiefbiiko/hmac.svg?style=flat)](http://travis-ci.org/chiefbiiko/hmac) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/chiefbiiko/hmac?branch=master&svg=true)](https://ci.appveyor.com/project/chiefbiiko/hmac)

## Usage

``` ts
import { hmac } from "https://denopkg.com/chiefbiiko/hmac/mod.ts";

const key: Uint8Array = new Uint8Array(32).fill(99)
const msg: Uint8Array = new Uint8Array(128).fill(77)

// the simple way
const mac: Uint8Array = hmac("sha256", key, msg);
```

## API

Groundwork:

``` ts
export interface Hash {
  hashSize: number;
  init(): Hash;
  update(msg?: Uint8Array): Hash;
  digest(msg?: Uint8Array): Uint8Array;
}
```

### `new HMAC(hasher: Hash)`

Creates a `HMAC` instance.

### `HMAC#init(key: Uint8Array): HMAC`

Initializes a `HMAC` instance.

### `HMAC#update(msg?: Uint8Array): HMAC`

Updates the instance with a message block.

### `HMAC#digest(msg?: Uint8Array): Uint8Array`

Obtain a hash based message authentication tag.

## License

[MIT](./LICENSE)
