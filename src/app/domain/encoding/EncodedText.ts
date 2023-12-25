import { Bit } from '../Bit'
import { Codepoint } from '../Codepoint'
import { EncodedCodepoint } from './EncodedCodepoint'

export class EncodedText {
  constructor(
    private originalText: string,
    private encodedCodepoints: EncodedCodepoint[],
  ) {}

  static encode(text: string) {
    const encodedCodepoints = Codepoint.from(text).map(EncodedCodepoint.encode)

    return new EncodedText(text, encodedCodepoints)
  }

  getOriginalText() {
    return this.originalText
  }

  getEncoding(): Bit[] {
    return this.encodedCodepoints.flatMap((encodedCodepoint) =>
      encodedCodepoint.getEncoding(),
    )
  }

  countCodepoints() {
    return this.encodedCodepoints.length
  }

  getEncodedCodepoints() {
    return this.encodedCodepoints
  }
}