import { BinarySequence } from '../BinarySequence'
import { Utf8Template } from '../Utf8Template'

export class Utf8Encoder {
  static encodeBits(sequence: BinarySequence): BinarySequence {
    return Utf8Template.forBinary(sequence).unshiftInSlots(sequence)
  }
}
