import { Bit } from '../Binary'
import { Utf8Template } from '../Utf8Template'

export class Utf8Encoder {
  static encodeBits(bits: Bit[]): Bit[] {
    return Utf8Template.forBits(bits).unshiftInSlots(bits)
  }
}
