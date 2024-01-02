import { Codepoint } from '../Codepoint'
import { Utf8Encoder } from './Utf8Encoder'
import { Utf8Template } from '../Utf8Template'
import { BinarySequence } from '../BinarySequence'

export class EncodedCodepoint {
  private constructor(
    private codepoint: Codepoint,
    private encoded: BinarySequence,
  ) {}

  static encode(codepoint: Codepoint) {
    return new EncodedCodepoint(
      codepoint,
      Utf8Encoder.encodeBits(codepoint.toBinary()),
    )
  }

  getCodepoint() {
    return this.codepoint
  }

  getEncoding() {
    return this.encoded
  }

  getEncodingTemplate() {
    return Utf8Template.forBinary(this.codepoint.toBinary())
  }

  countEncodingBytes() {
    return this.encoded.countBytes()
  }
}
