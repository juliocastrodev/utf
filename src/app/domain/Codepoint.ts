import { Bit } from "./Bit"

export class Codepoint {
  private constructor(
    private codepointInHex: string,
    private originalText: string,
  ) {}

  static from(text: string): Codepoint[] {
    return Array.from(text).map((unit) => {
      const codepointInDecimal = unit.codePointAt(0)

      if (!codepointInDecimal)
        throw new Error(`Could not get codepoint of ${unit}`)

      const codepointInHex = codepointInDecimal.toString(16).toUpperCase()

      return new Codepoint(codepointInHex, unit)
    })
  }

  getOriginalText() {
    return this.originalText
  }

  toBinary() {
    return parseInt(this.codepointInHex, 16).toString(2).split("") as Bit[]
  }

  toString() {
    return `U+${this.codepointInHex}`
  }
}
