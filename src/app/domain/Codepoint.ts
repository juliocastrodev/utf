import { BinarySequence } from './BinarySequence'

// TODO: search in project all "new Error(...)" and move those (like the one
// in this file) to a domain error if it makes sense

export class Codepoint {
  private character: string

  // TODO: make it private
  constructor(public codepointInDecimal: number) {
    this.character = String.fromCodePoint(codepointInDecimal)
  }

  static fromText(text: string): Codepoint[] {
    return Array.from(text).map((character) => {
      const codepointInDecimal = character.codePointAt(0)

      if (!codepointInDecimal)
        throw new Error(`Could not get codepoint of ${character}`)

      return new Codepoint(codepointInDecimal)
    })
  }

  static fromBinary(sequence: BinarySequence) {
    return new Codepoint(sequence.toDecimal())
  }

  getCharacter() {
    return this.character
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
