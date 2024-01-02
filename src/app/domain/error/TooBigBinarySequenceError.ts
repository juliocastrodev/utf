import { Bit } from '../Binary'

export class TooBigBinarySequenceError extends Error {
  constructor(params: { sequence: Bit[]; maxBits: number }) {
    super(
      `Binary sequence [${params.sequence}] exceeds the maximum number of bits which is ${params.maxBits}`,
    )
  }
}
