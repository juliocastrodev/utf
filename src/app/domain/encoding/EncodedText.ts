import { Bit } from '../Binary'
import { Codepoint } from '../Codepoint'
import { EncodedCodepoint } from './EncodedCodepoint'

export class EncodedText {
  private constructor(
    private originalText: string,
    private encodedCodepoints: EncodedCodepoint[],
  ) {}

  static encode(text: string) {
    const encodedCodepoints = Codepoint.fromText(text).map(EncodedCodepoint.encode)

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
