import { Bit } from '../Binary'
import { Utf8Template } from '../Utf8Template'

export class MismatchUtf8TemplateError extends Error {
  constructor(params: { sequence: Bit[]; expected: Utf8Template }) {
    super(
      `Binary sequence [${params.sequence}] doesn't match expected utf-8 template: ${params.expected}`,
    )
  }
}
