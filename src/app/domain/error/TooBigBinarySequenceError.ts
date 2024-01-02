import { BinarySequence } from '../BinarySequence'

export class TooBigBinarySequenceError extends Error {
  constructor(params: { sequence: BinarySequence; maxBits: number }) {
    super(
      `Binary sequence [${params.sequence}] exceeds the maximum number of bits which is ${params.maxBits}`,
    )
  }
}
