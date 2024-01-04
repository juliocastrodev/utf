import { BinarySequence } from '../BinarySequence'
import { Utf8Template } from '../Utf8Template'

export class MismatchUtf8TemplateError extends Error {
  constructor(
    public params: { sequence: BinarySequence; expected: Utf8Template },
  ) {
    super(
      `Binary sequence [${params.sequence}] doesn't match expected utf-8 template: ${params.expected}`,
    )
  }
}
