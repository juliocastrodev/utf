import { BinarySequence, Bit, Byte } from './BinarySequence'
import { InvalidInitialUtf8ByteError } from './error/InvalidInitialUtf8ByteError'
import { MismatchUtf8TemplateError } from './error/MismatchUtf8TemplateError'
import { TooLongBinarySequenceError } from './error/TooLongBinarySequenceError'

export class Utf8Template {
  private constructor(private template: string) {}

  private static ONE_BYTE = new Utf8Template('0xxxxxxx')
  private static TWO_BYTES = new Utf8Template('110xxxxx10xxxxxx')
  private static THREE_BYTES = new Utf8Template('1110xxxx10xxxxxx10xxxxxx')
  private static FOUR_BYTES = new Utf8Template(
    '11110xxx10xxxxxx10xxxxxx10xxxxxx',
  )

  static all() {
    return [this.ONE_BYTE, this.TWO_BYTES, this.THREE_BYTES, this.FOUR_BYTES]
  }

  static forBinary(sequence: BinarySequence) {
    const template = this.all().find((template) =>
      template.hasEnoughSlotsFor(sequence),
    )

    if (!template)
      throw new TooLongBinarySequenceError({
        sequence,
        maxBits: this.FOUR_BYTES.countSlots(),
      })

    return template
  }

  static forInitialByte(byte: Byte) {
    const byteStr = byte.join('')

    const template = this.all().find((template) =>
      byteStr.startsWith(template.prefix()),
    )

    if (!template) throw new InvalidInitialUtf8ByteError(byte)

    return template
  }

  hasEnoughSlotsFor(sequence: BinarySequence) {
    return this.countSlots() >= sequence.countBits()
  }

  prefix() {
    const binaryParts = this.template.match(/\d+/g) as string[]
    return binaryParts[0]
  }

  countSlots() {
    const xsCount = this.template.match(/x/g)?.length ?? 0
    return xsCount
  }

  countBits() {
    return this.template.length
  }

  countBytes() {
    return this.countBits() / 8
  }

  countIntermediateBytes() {
    return this.countBytes() - 1
  }

  unshiftInSlots(sequence: BinarySequence): BinarySequence {
    if (!this.hasEnoughSlotsFor(sequence)) {
      throw new TooLongBinarySequenceError({
        sequence,
        maxBits: this.countBits(),
      })
    }

    const templateArray = this.template.split('')
    let currentBitIdx = sequence.countBits() - 1

    for (
      let templateIdx = templateArray.length - 1;
      templateIdx >= 0;
      templateIdx--
    ) {
      if (templateArray[templateIdx] === 'x') {
        templateArray[templateIdx] = sequence.bitAt(currentBitIdx) ?? '0'
        currentBitIdx--
      }
    }

    return new BinarySequence(templateArray as Bit[])
  }

  readSlotsFrom(sequence: BinarySequence): BinarySequence {
    if (sequence.countBits() !== this.countBits())
      throw new MismatchUtf8TemplateError({ sequence, expected: this })

    const readBits: Bit[] = []

    for (let i = 0; i < this.template.length; i++) {
      if (this.template[i] === 'x') {
        readBits.push(sequence.bitAt(i)!)
      } else if (this.template[i] !== sequence.bitAt(i)) {
        throw new MismatchUtf8TemplateError({ sequence, expected: this })
      }
    }

    return new BinarySequence(readBits)
  }

  toString() {
    return this.template
  }
}
