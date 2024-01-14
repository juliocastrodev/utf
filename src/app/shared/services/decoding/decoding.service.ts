import { Injectable } from '@angular/core'
import { BinarySequence } from '../../../domain/BinarySequence'
import { NotByteSequenceError } from '../../../domain/error/NotByteSequenceError'
import { InvalidInitialUtf8ByteError } from '../../../domain/error/InvalidInitialUtf8ByteError'
import { MismatchUtf8TemplateError } from '../../../domain/error/MismatchUtf8TemplateError'
import { Utf8BinarySequence } from '../../../domain/Utf8BinarySequence'
import { Utf8Text } from '../../../domain/Utf8Text'
import { Utf8Codepoint } from '../../../domain/Utf8Codepoint'

// There may be another good one to add as domain error: Invalid Codepoint.
// For example, this sequence: 11110101 10101110 10100100 10101111 produces
// an unicode (1501487) that doesn't have any character/text associated

// TODO: move this somewhere else
export type DecodeError =
  | NotByteSequenceError
  | InvalidInitialUtf8ByteError
  | MismatchUtf8TemplateError

@Injectable({ providedIn: 'root' })
export class DecodingService {
  decode(sequence: BinarySequence) {
    let text: Utf8Text

    try {
      const encodedCodepoints = Utf8BinarySequence.groupIntoUtf8Sequences(
        sequence,
      ).map((utf8Sequence) => Utf8Codepoint.from(utf8Sequence))

      text = Utf8Text.from(encodedCodepoints)
    } catch (error: unknown) {
      return { error: error as DecodeError }
    }

    return { text }
  }
}
