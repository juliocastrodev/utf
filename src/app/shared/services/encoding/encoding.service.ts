import { Injectable } from '@angular/core'
import { Codepoint } from '../../../domain/Codepoint'
import { Utf8Encoder } from '../../../domain/encoding/Utf8Encoder'

export type EncodingResult = ReturnType<EncodingService['encodeText']>

@Injectable({ providedIn: 'root' })
export class EncodingService {
  encodeText(text: string) {
    const codepoints = Codepoint.from(text).map((codepoint) => ({
      original: codepoint,
      encoded: Utf8Encoder.encodeCodepoint(codepoint),
    }))
    const encodedText = codepoints.flatMap(({ encoded }) => encoded)

    console.log({ codepoints, encodedText })

    return { originalText: text, encodedText, codepoints }
  }
}
