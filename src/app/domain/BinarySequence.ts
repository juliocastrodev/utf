import { NotByteSequenceError } from './error/NotByteSequenceError'
import { chunks } from './utils/chunks'

export type Bit = '0' | '1'
export type Byte = [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit]

export class BinarySequence {
  constructor(private bits: Bit[]) {}

  static from(str: string) {
    // TODO: maybe this exception can be grouped with NotByteSequenceError
    if (!this.isBinary(str)) throw new Error('Not Binary sequence error')

    return new BinarySequence(str.split('') as Bit[])
  }

  static concat(...sequences: BinarySequence[]) {
    const allBits = sequences.flatMap(({ bits }) => bits)
    return new BinarySequence(allBits)
  }

  static isBinary(str: string) {
    return /^(0|1)+$/g.test(str)
  }

  getBits() {
    return this.bits
  }

  bitAt(index: number): Bit | undefined {
    return this.bits[index]
  }

  // TODO: maybe this can be replaced with something like getByteAt(idx)
  groupInBytes() {
    if (this.bits.length % 8 !== 0) throw new NotByteSequenceError(this)

    return chunks(this.bits, 8) as Byte[]
  }

  countBits() {
    return this.bits.length
  }

  toDecimal() {
    return parseInt(this.bits.join(''), 2)
  }

  toString() {
    return chunks(this.bits, 8)
      .map((chunk) => chunk.join(''))
      .join(' ')
  }
}
