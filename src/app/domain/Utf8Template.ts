import { BinarySequence, Bit, Byte } from './BinarySequence'
import { InvalidInitialUtf8ByteError } from './error/InvalidInitialUtf8ByteError'
import { MismatchUtf8TemplateError } from './error/MismatchUtf8TemplateError'
import { TooLongBinarySequenceError } from './error/TooLongBinarySequenceError'
import { chunks } from './utils/chunks'

// TODO: search all usages of 'this' in static methods and change
// it to the name of the class, it's clearer that way

export class Utf8Template {
  private constructor(private template: string) {}

  private static ONE_BYTE = new Utf8Template('0xxxxxxx')
  private static TWO_BYTES = new Utf8Template('110xxxxx10xxxxxx')
  private static THREE_BYTES = new Utf8Template('1110xxxx10xxxxxx10xxxxxx')
  private static FOUR_BYTES = new Utf8Template(
    '11110xxx10xxxxxx10xxxxxx10xxxxxx',
  )

  static all() {
    return [
      Utf8Template.ONE_BYTE,
      Utf8Template.TWO_BYTES,
      Utf8Template.THREE_BYTES,
      Utf8Template.FOUR_BYTES,
    ]
  }

  static toFit(sequence: BinarySequence) {
    const template = Utf8Template.all().find((template) =>
      template.hasEnoughSlotsFor(sequence),
    )

    if (!template)
      throw new TooLongBinarySequenceError({
        sequence,
        maxBits: Utf8Template.FOUR_BYTES.countSlots(),
      })

    return template
  }

  static matchingInitialByte(byte: Byte) {
    const template = Utf8Template.all().find((template) =>
      template.matchesInitial(byte),
    )

    if (!template) throw new InvalidInitialUtf8ByteError(byte)

    return template
  }

  hasEnoughSlotsFor(sequence: BinarySequence) {
    return this.countSlots() >= sequence.countBits()
  }

  matchesInitial(byte: Byte) {
    const { initialBytePrefix } = this.prefixes()

    return byte.join('').startsWith(initialBytePrefix)
  }

  matchesIntermediate(byte: Byte) {
    const { intermediateBytePrefix } = this.prefixes()

    if (!intermediateBytePrefix) return false

    return byte.join('').startsWith(intermediateBytePrefix)
  }

  prefixes() {
    const binaryParts = this.template.match(/\d+/g) as string[]

    const initialBytePrefix = binaryParts[0]
    const intermediateBytePrefix = binaryParts[1] as string | undefined

    return { initialBytePrefix, intermediateBytePrefix }
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

  getByteAt(idx: number): string {
    const bytes = chunks(this.template.split(''), 8)

    return bytes[idx].join('')
  }

  unshiftInSlots(sequence: BinarySequence): BinarySequence {
    if (!this.hasEnoughSlotsFor(sequence)) {
      throw new TooLongBinarySequenceError({
        sequence,
        maxBits: this.countSlots(),
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

  ensureMatches(sequence: BinarySequence) {
    const [firstByte, ...restOfBytes] = sequence.groupInBytes()

    if (
      !this.matchesInitial(firstByte) ||
      this.countIntermediateBytes() !== restOfBytes.length ||
      restOfBytes.some((byte) => !this.matchesIntermediate(byte))
    )
      throw new MismatchUtf8TemplateError({ sequence, expected: this })
  }

  toString() {
    return this.template
  }
}
