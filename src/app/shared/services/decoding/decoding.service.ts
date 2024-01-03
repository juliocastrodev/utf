import { Injectable } from '@angular/core'
import { BinarySequence } from '../../../domain/BinarySequence'
import { Utf8Decoder } from '../../../domain/decoding/Utf8Decoder'

@Injectable({ providedIn: 'root' })
export class DecodingService {
  decode(sequence: BinarySequence) {
    const codepoints = Utf8Decoder.decode(sequence)
    const text = String.fromCodePoint(
      ...codepoints.map((codepoint) => codepoint.toDecimal()),
    )

    return { codepoints, text }
  }
}
