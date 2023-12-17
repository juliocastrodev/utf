import { Codepoint } from './Codepoint'

export class Utf8EncodedCodepoint {
  private constructor(
    private codepoint: Codepoint,
    private ut8Encoded: string,
  ) {}

  static encode(codepoint: Codepoint) {
    return new Utf8EncodedCodepoint(
      codepoint,
      `encoded-${codepoint.getOriginalText()}`,
    )
  }

  getOriginalText() {
    return this.codepoint.getOriginalText()
  }

  getUtf8Encoded() {
    return this.ut8Encoded
  }
}
