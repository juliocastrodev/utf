import { Injectable } from '@angular/core'
import { Codepoint } from './Codepoint'
import { Utf8EncodedCodepoint } from './Utf8EncodedCodepoint'

@Injectable({ providedIn: 'root' })
export class EncodingService {
  encode(text: string) {
    const encodedCodepoints = Codepoint.from(text).map(
      Utf8EncodedCodepoint.encode,
    )
    const encodedText = encodedCodepoints
      .map((encodedCodepoint) => encodedCodepoint.getUtf8Encoded())
      .join("__")

    return { encodedText, encodedCodepoints }
  }
}
