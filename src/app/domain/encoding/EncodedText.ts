import { BinarySequence } from '../BinarySequence'
import { Codepoint } from '../Codepoint'
import { EncodedCodepoint } from './EncodedCodepoint'

export class EncodedText {
  private constructor(
    private originalText: string,
    private encodedCodepoints: EncodedCodepoint[],
  ) {}

  static encode(text: string) {
    const encodedCodepoints = Codepoint.fromText(text).map(
      EncodedCodepoint.encode,
    )

    return new EncodedText(text, encodedCodepoints)
  }

  getOriginalText() {
    return this.originalText
  }

  getEncoding(): BinarySequence {
    return BinarySequence.concat(
      ...this.encodedCodepoints.map((encodedCodepoint) =>
        encodedCodepoint.getEncoding(),
      ),
    )
  }

  countCodepoints() {
    return this.encodedCodepoints.length
  }

  getEncodedCodepoints() {
    return this.encodedCodepoints
  }
}
