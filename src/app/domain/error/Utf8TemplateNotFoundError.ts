import { Byte } from '../BinarySequence'

// TODO: all other exceptions take BinarySequence. It would be nice that this also
// does it. Or rethink this error and try to integrate it in another one...
export class Utf8TemplateNotFoundError extends Error {
  constructor(byte: Byte) {
    super(`Could not found any valid utf-8 template for byte: [${byte}]`)
  }
}
