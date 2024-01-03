import { BinarySequence } from './BinarySequence'

export class Codepoint {
  private character: string

  constructor(private codepointInDecimal: number) {
    this.character = String.fromCodePoint(codepointInDecimal)
  }

  static fromText(text: string): Codepoint[] {
    return Array.from(text).map(
      (character) => new Codepoint(character.codePointAt(0)!),
    )
  }

  static fromBinary(sequence: BinarySequence) {
    return new Codepoint(sequence.toDecimal())
  }

  getCharacter() {
    return this.character
  }

  toDecimal() {
    return this.codepointInDecimal
  }

  toBinary() {
    return BinarySequence.from(this.codepointInDecimal.toString(2))
  }

  toHex() {
    return this.codepointInDecimal.toString(16)
  }

  toString() {
    return `U+${this.toHex()}`
  }
}
