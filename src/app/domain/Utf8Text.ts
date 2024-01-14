import { BinarySequence } from './BinarySequence'
import { Codepoint } from './Codepoint'
import { Utf8Codepoint } from './Utf8Codepoint'

export class Utf8Text {
  private constructor(
    private originalText: string,
    private encodedCodepoints: Utf8Codepoint[],
  ) {}

  static encode(text: string) {
    const encodedCodepoints = Codepoint.fromText(text).map(Utf8Codepoint.encode)

    return new Utf8Text(text, encodedCodepoints)
  }

  static from(encodedCodepoints: Utf8Codepoint[]) {
    // TODO: this .fromCodepoint() can raise an out
    // of range codepoint error. Perhaps it's a good
    // idea to wrap it into a domain error OR add this
    // validation in the Codepoint aggregate
    const originalText = String.fromCodePoint(
      ...encodedCodepoints.map((encodedCodepoint) =>
        encodedCodepoint.getCodepoint().toDecimal(),
      ),
    )

    return new Utf8Text(originalText, encodedCodepoints)
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
