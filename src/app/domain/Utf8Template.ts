import { Bit, Byte } from './Binary'
import { MismatchUtf8TemplateError } from './error/MismatchUtf8TemplateError'
import { TooBigBinarySequenceError } from './error/TooBigBinarySequenceError'
import { Utf8TemplateNotFoundError } from './error/Utf8TemplateNotFoundError'

export class Utf8Template {
  private constructor(private template: string) {}

  private static ONE_BYTE = new Utf8Template('0xxxxxxx')
  private static TWO_BYTES = new Utf8Template('110xxxxx10xxxxxx')
  private static THREE_BYTES = new Utf8Template('1110xxxx10xxxxxx10xxxxxx')
  private static FOUR_BYTES = new Utf8Template(
    '11110xxx10xxxxxx10xxxxxx10xxxxxx',
  )

  static forBits(bits: Bit[]) {
    const bitsCount = bits.length

    if (bitsCount <= 7) return this.ONE_BYTE
    if (bitsCount <= 11) return this.TWO_BYTES
    if (bitsCount <= 16) return this.THREE_BYTES
    if (bitsCount <= 21) return this.FOUR_BYTES

    throw new TooBigBinarySequenceError({ sequence: bits, maxBits: 21 })
  }

  static forInitialByte(byte: Byte) {
    const byteStr = byte.join('')

    const template = [
      this.ONE_BYTE,
      this.TWO_BYTES,
      this.THREE_BYTES,
      this.FOUR_BYTES,
    ].find((template) => byteStr.startsWith(template.prefix()))

    if (!template) throw new Utf8TemplateNotFoundError(byte)

    return template
  }

  prefix() {
    const binaryParts = this.template.match(/\d+/g)! as string[]
    return binaryParts[0]
  }

  unshiftInSlots(bits: Bit[]): Bit[] {
    if (bits.length > this.template.length)
      throw new TooBigBinarySequenceError({
        sequence: bits,
        maxBits: this.template.length,
      })

    const templateArray = this.template.split('')

    let currentBitIdx = bits.length - 1
    for (
      let toReplaceIdx = this.template.length - 1;
      toReplaceIdx >= 0;
      toReplaceIdx--
    ) {
      if (templateArray[toReplaceIdx] === 'x') {
        templateArray[toReplaceIdx] = bits[currentBitIdx] ?? '0'
        currentBitIdx--
      }
    }

    return templateArray as Bit[]
  }

  countBytes() {
    const zerosCount = this.template.match(/0/g)?.length ?? 0
    return zerosCount
  }

  countIntermediateBytes() {
    return this.countBytes() - 1
  }

  readSlotsFrom(bits: Bit[]) {
    if (bits.length !== this.template.length)
      throw new MismatchUtf8TemplateError({ sequence: bits, expected: this })

    const result: Bit[] = []

    bits.forEach((bit, idx) => {
      if (this.template[idx] === 'x') {
        result.push(bit)
      } else if (bit !== this.template[idx]) {
        throw new MismatchUtf8TemplateError({ sequence: bits, expected: this })
      }
    })

    return result
  }

  toString() {
    return this.template
  }
}
