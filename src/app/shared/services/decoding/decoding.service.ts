import { Injectable } from '@angular/core'
import { BinarySequence } from '../../../domain/BinarySequence'
import { Utf8Decoder } from '../../../domain/decoding/Utf8Decoder'
import { NotByteSequenceError } from '../../../domain/error/NotByteSequenceError'
import { Codepoint } from '../../../domain/Codepoint'
import { InvalidInitialUtf8ByteError } from '../../../domain/error/InvalidInitialUtf8ByteError'
import { MismatchUtf8TemplateError } from '../../../domain/error/MismatchUtf8TemplateError'

// TODO: move this somewhere else
export type DecodeError =
  | NotByteSequenceError
  | InvalidInitialUtf8ByteError
  | MismatchUtf8TemplateError

@Injectable({ providedIn: 'root' })
export class DecodingService {
  decode(sequence: BinarySequence) {
    let codepoints: Codepoint[]
    try {
      codepoints = Utf8Decoder.decode(sequence)
    } catch (error: unknown) {
      return { error: error as DecodeError }
    }

    const text = String.fromCodePoint(
      ...codepoints.map((codepoint) => codepoint.toDecimal()),
    )

    return { codepoints, text }
  }
}
