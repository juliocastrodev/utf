import { Codepoint } from './Codepoint'
import { Utf8BinarySequence } from './Utf8BinarySequence'

// TODO: search usages of getters outside of domain. Probably
// I'm exposing too much with the getters, provoking a log of
// .get()....get().get() chaining (specially in component templates)

export class Utf8Codepoint {
  private constructor(
    private codepoint: Codepoint,
    private encoded: Utf8BinarySequence,
  ) {}

  static encode(codepoint: Codepoint) {
    return new Utf8Codepoint(
      codepoint,
      Utf8BinarySequence.encode(codepoint.toBinary()),
    )
  }

  static from(encoded: Utf8BinarySequence) {
    const codepoint = Codepoint.fromBinary(encoded.decode())

    return new Utf8Codepoint(codepoint, encoded)
  }

  getCodepoint() {
    return this.codepoint
  }

  getEncoding() {
    return this.encoded
  }
}
