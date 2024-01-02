import { Bit } from './Binary'

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

  static fromBinary(bits: Bit[]) {
    const codepointInDecimal = parseInt(bits.join(''), 2)
    return new Codepoint(codepointInDecimal)
  }

  getCharacter() {
    return this.character
  }

  toBinary() {
    return this.codepointInDecimal.toString(2).split('') as Bit[]
  }

  toHex() {
    return this.codepointInDecimal.toString(16)
  }

  toString() {
    return `U+${this.toHex()}`
  }
}
