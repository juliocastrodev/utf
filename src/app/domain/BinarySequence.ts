import { NotBinarySequenceError } from './error/NotBinarySequenceError'
import { NotByteSequenceError } from './error/NotByteSequenceError'
import { chunks } from './utils/chunks'

export type Bit = '0' | '1'
export type Byte = [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit]

export class BinarySequence {
  constructor(private bits: Bit[]) {}

  static empty() {
    return new BinarySequence([])
  }

  static from(str: string) {
    if (!this.isBinary(str)) throw new NotBinarySequenceError(str)

    return new BinarySequence(str.split('') as Bit[])
  }

  static isBinary(str: string) {
    return /^(0|1)+$/g.test(str)
  }

  static concat(...sequences: BinarySequence[]) {
    const allBits = sequences.flatMap(({ bits }) => bits)
    return new BinarySequence(allBits)
  }

  static extractBitsFrom(str: string) {
    return str.split('').filter(this.isBinary) as Bit[]
  }

  getBits() {
    return [...this.bits]
  }

  isGroupableInBytes() {
    return this.bits.length % 8 === 0
  }

  getPotentiallyUncompletedLastByte(): Bit[] {
    return chunks(this.bits, 8).at(-1) ?? []
  }

  bitAt(index: number): Bit | undefined {
    return this.bits[index]
  }

  boundariesOf(another: BinarySequence) {
    const startIndex = this.bits.join('').indexOf(another.bits.join(''))

    if (startIndex < 0) return { startIndex: -1, endIndex: -1 }

    return { startIndex, endIndex: startIndex + another.countBits() - 1 }
  }

  groupInBytes() {
    if (!this.isGroupableInBytes()) throw new NotByteSequenceError(this)

    return chunks(this.bits, 8) as Byte[]
  }

  isEmpty() {
    return this.bits.length === 0
  }

  countBits() {
    return this.bits.length
  }

  countBytes() {
    return this.groupInBytes().length
  }

  countBitsToReachByteGroupableSize() {
    return this.isGroupableInBytes()
      ? 0
      : 8 - this.getPotentiallyUncompletedLastByte().length
  }

  toDecimal() {
    return parseInt(this.bits.join(''), 2)
  }

  // TODO: search for usages of .getBits().join(''). Maybe this should be
  // the behavior of .toString() and move this little "formatting" we have
  // right now somewhere else...

  toString() {
    return chunks(this.bits, 8)
      .map((chunk) => chunk.join(''))
      .join(' ')
  }

  equals(another: BinarySequence) {
    if (this.countBits() !== another.countBits()) return false

    for (let i = 0; i < this.countBits(); i++) {
      if (this.bitAt(i) !== another.bitAt(i)) return false
    }

    return true
  }
}
