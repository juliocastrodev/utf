import { Byte } from '../BinarySequence'
import { Utf8Template } from '../Utf8Template'

export class InvalidInitialUtf8ByteError extends Error {
  constructor(byte: Byte) {
    const message =
      `Byte [${byte.join('')}] doesn't have the right ` +
      `format to be the initial byte of an utf-8 binary sequence. ` +
      `It must start with one of the following bits prefixes: ` +
      `[${Utf8Template.all().map((template) => template.prefix())}]`

    super(message)
  }
}
