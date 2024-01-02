import { NotByteSequenceError } from './error/NotByteSequenceError'
import { chunks } from './utils/chunks'

export type Bit = '0' | '1'
export type Byte = [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit]

export function groupInBytes(bits: Bit[]): Byte[] {
  if (bits.length % 8 !== 0) throw new NotByteSequenceError(bits)

  return chunks(bits, 8) as Byte[]
}

export function isBinary(str: string) {
  return /^(0|1)+$/g.test(str)
}
