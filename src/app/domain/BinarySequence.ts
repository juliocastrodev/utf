import { NotBinarySequenceError } from './error/NotBinarySequenceError'
import { NotByteSequenceError } from './error/NotByteSequenceError'
import { chunks } from './utils/chunks'

export type Bit = '0' | '1'
export type Byte = [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit]

export class BinarySequence {
  constructor(private bits: Bit[]) {}

  static from(str: string) {
    if (!this.isBinary(str)) throw new NotBinarySequenceError(str)

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

  groupInBytes() {
    if (this.bits.length % 8 !== 0) throw new NotByteSequenceError(this)

    return chunks(this.bits, 8) as Byte[]
  }

  countBits() {
    return this.bits.length
  }

  countBytes() {
    return this.groupInBytes().length
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
