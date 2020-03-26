import { SHA1, SHA256, SHA512, encode } from "./deps.ts";

export enum Hash {
  SHA1 = 'SHA1',
  SHA256 = 'SHA256',
  SHA512 = 'SHA512'
}

/** An interface representation of a hash algorithm implementation. */
interface _Hash {
  hashSize: number;
  init(): _Hash;
  update(msg: string | Uint8Array, inputEncoding?: string): _Hash;
  digest(outputEncoding?: string): string | Uint8Array;
}

/** A class representation of the HMAC algorithm. */
export class HMAC {
  readonly hashSize: number;
  readonly B: number;
  readonly iPad: number;
  readonly oPad: number;

  private iKeyPad!: Uint8Array;
  private oKeyPad!: Uint8Array;
  private hasher: _Hash;

  /** Creates a new HMAC instance. */
  constructor(hasher: _Hash, key?: string | Uint8Array) {
    this.hashSize = hasher.hashSize;
    this.hasher = hasher;
    this.B = this.hashSize <= 32 ? 64 : 128; // according to RFC4868
    this.iPad = 0x36;
    this.oPad = 0x5c;

    if (key) {
      this.init(key);
    }
  }

  /** Initializes an HMAC instance. */
  init(key: string | Uint8Array, inputEncoding?: string): HMAC {
    if (!key) {
      key = new Uint8Array(0);
    } else if (typeof key === "string") {
      key = encode(key, inputEncoding) as Uint8Array;
    }

    // process the key
    let _key: Uint8Array = new Uint8Array(key);

    if (_key.length > this.B) {
      // keys longer than blocksize are shortened
      this.hasher.init();
      _key = this.hasher.update(key).digest() as Uint8Array;
    }

    // zeropadr
    if (_key.byteLength < this.B) {
      const tmp: Uint8Array = new Uint8Array(this.B);
      tmp.set(_key, 0);
      _key = tmp;
    }

    // setup the key pads
    this.iKeyPad = new Uint8Array(this.B);
    this.oKeyPad = new Uint8Array(this.B);

    for (let i: number = 0; i < this.B; ++i) {
      this.iKeyPad[i] = this.iPad ^ _key[i];
      this.oKeyPad[i] = this.oPad ^ _key[i];
    }

    // blackout key
    _key.fill(0);

    // initial hash
    this.hasher.init();
    this.hasher.update(this.iKeyPad);

    return this;
  }

  /** Update the HMAC with additional message data. */
  update(
    msg: string | Uint8Array = new Uint8Array(0),
    inputEncoding?: string
  ): HMAC {
    if (typeof msg === "string") {
      msg = encode(msg, inputEncoding) as Uint8Array;
    }

    this.hasher.update(msg);

    return this;
  }

  /** Finalize the HMAC with additional message data. */
  digest(outputEncoding?: string): string | Uint8Array {
    const sum1: Uint8Array = this.hasher.digest() as Uint8Array; // get sum 1

    this.hasher.init();

    return this.hasher
      .update(this.oKeyPad)
      .update(sum1)
      .digest(outputEncoding);
  }
}

/** Returns a HMAC of the given msg and key using the indicated hash. */
export function hmac(
  hash: Hash,
  key: string | Uint8Array,
  msg?: string | Uint8Array,
  inputEncoding?: string,
  outputEncoding?: string
): string | Uint8Array {
  switch(hash) {
    case Hash.SHA1:
      return new HMAC(new SHA1())
        .init(key, inputEncoding)
        .update(msg, inputEncoding)
        .digest(outputEncoding);
    case Hash.SHA256:
      return new HMAC(new SHA256())
        .init(key, inputEncoding)
        .update(msg, inputEncoding)
        .digest(outputEncoding);
    case Hash.SHA512:
      return new HMAC(new SHA512())
        .init(key, inputEncoding)
        .update(msg, inputEncoding)
        .digest(outputEncoding);
    default:
      throw new TypeError(
        `Unsupported hash ${hash}. Must be one of (${Object.keys(Hash).join('|')})`
      );
  }
}
