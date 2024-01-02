import { Bit, groupInBytes } from '../Binary'
import { Codepoint } from '../Codepoint'
import { Utf8Encoder } from './Utf8Encoder'
import { Utf8Template } from '../Utf8Template'

export class EncodedCodepoint {
  private constructor(
    private codepoint: Codepoint,
    private encoded: Bit[],
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
    return Utf8Template.forBits(this.codepoint.toBinary())
  }

  countEncodingBytes() {
    return groupInBytes(this.encoded).length
  }
}
