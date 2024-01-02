import { Bit, groupInBytes } from '../Binary'
import { Codepoint } from '../Codepoint'
import { Utf8Template } from '../Utf8Template'

export class Utf8Decoder {
  static decode(bits: Bit[]): Codepoint[] {
    const bytes = groupInBytes(bits)
    const codepoints: Codepoint[] = []

    let currentByteIdx = 0
    while (currentByteIdx < bytes.length) {
      const firstByte = bytes[currentByteIdx]
      const template = Utf8Template.forInitialByte(firstByte)

      const nextBytes = bytes.slice(
        currentByteIdx + 1,
        currentByteIdx + 1 + template.countIntermediateBytes(),
      )

      const completeSequence = [firstByte, ...nextBytes].flat()
      const decoded = template.readSlotsFrom(completeSequence)

      codepoints.push(Codepoint.fromBinary(decoded))
      currentByteIdx += template.countBytes()
    }

    return codepoints
  }
}
