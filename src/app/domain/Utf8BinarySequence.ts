import { BinarySequence } from './BinarySequence'
import { Utf8Template } from './Utf8Template'

export class Utf8BinarySequence extends BinarySequence {
  private constructor(
    encodedSequence: BinarySequence,
    private template: Utf8Template,
  ) {
    super(encodedSequence.getBits())
  }

  static encode(sequence: BinarySequence): Utf8BinarySequence {
    const template = Utf8Template.toFit(sequence)
    const encodedSequence = template.unshiftInSlots(sequence)

    return new Utf8BinarySequence(encodedSequence, template)
  }

  static groupIntoUtf8Sequences(
    sequence: BinarySequence,
  ): Utf8BinarySequence[] {
    const bytes = sequence.groupInBytes()

    const utf8Sequences: Utf8BinarySequence[] = []
    let currentByteIdx = 0

    while (currentByteIdx < bytes.length) {
      const firstByte = bytes[currentByteIdx]
      const template = Utf8Template.matchingInitialByte(firstByte)

      const nextBytes = bytes.slice(
        currentByteIdx + 1,
        currentByteIdx + 1 + template.countIntermediateBytes(),
      )

      const sequence = new BinarySequence([firstByte, ...nextBytes].flat())
      template.ensureMatches(sequence)
      utf8Sequences.push(new Utf8BinarySequence(sequence, template))

      currentByteIdx += template.countBytes()
    }

    return utf8Sequences
  }

  decode(): BinarySequence {
    return this.template.readSlotsFrom(this)
  }

  getTemplate() {
    return this.template
  }
}
