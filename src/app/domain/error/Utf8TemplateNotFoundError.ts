import { Byte } from '../Binary'

export class Utf8TemplateNotFoundError extends Error {
  constructor(byte: Byte) {
    super(`Could not found any valid utf-8 template for byte: [${byte}]`)
  }
}
