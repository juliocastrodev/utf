import { BinarySequence } from '../BinarySequence'

export class NotByteSequenceError extends Error {
  constructor(public sequence: BinarySequence) {
    super(
      `Binary sequence [${sequence}] is not made of bytes. Its number of bits (${sequence.countBits()}) is not multiple of 8`,
    )
  }
}
