import { Bit } from '../Bit'
import { Codepoint } from '../Codepoint'

export class Utf8Encoder {
  static encodeText(text: string): Bit[] {
    return Codepoint.from(text).flatMap((codepoint) =>
      this.encodeCodepoint(codepoint),
    )
  }

  static encodeCodepoint(codepoint: Codepoint): Bit[] {
    return this.encodeBits(codepoint.toBinary())
  }

  static encodeBits(bits: Bit[]): Bit[] {
    const template = this.templateFor(bits)

    let currentBit = bits.length - 1
    for (
      let toReplaceIdx = template.length - 1;
      toReplaceIdx >= 0;
      toReplaceIdx--
    ) {
      if (template[toReplaceIdx] === 'x') {
        template[toReplaceIdx] = bits[currentBit] ?? '0'
        currentBit--
      }
    }

    return template as Bit[]
  }

  private static templateFor(bits: Bit[]) {
    const bitsCount = bits.length

    if (bitsCount <= 7) return 'xxxxxxxx'.split('')
    if (bitsCount <= 11) return '110xxxxx10xxxxxx'.split('')
    if (bitsCount <= 16) return '1110xxxx10xxxxxx10xxxxxx'.split('')
    if (bitsCount <= 21) return '11110xxx10xxxxxx10xxxxxx10xxxxxx'.split('')

    throw new Error(`Binary sequence ${bits} too big to encode with utf-8`)
  }
}
