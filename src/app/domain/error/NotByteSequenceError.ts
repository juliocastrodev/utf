import { Bit } from '../Binary'

// TODO: use the "chunks" login to display the bits. Here and in the rest of
// the exceptions. Right now it's too ugly to read...

export class NotByteSequenceError extends Error {
  constructor(bits: Bit[]) {
    super(
      `Binary sequence [${bits}] is not made of bytes. Its number of bits (${bits.length}) is not multiple of 8`,
    )
  }
}
