import { Component } from '@angular/core'
import { TextAreaComponent } from '../text-area/text-area.component'
import { BinarySequence } from '../../../domain/BinarySequence'
import { chunks } from '../../../domain/utils/chunks'

@Component({
  standalone: true,
  selector: 'utf-binary-text-area',
  imports: [TextAreaComponent],
  template: `
    <utf-text-area
      [(value)]="value"
      (keypress)="handleKeypress($event)"
      (paste)="handlePaste($event)"
      (blur)="format()"
    />
  `,
})
export class BinaryTextAreaComponent {
  private readonly BIT_GROUPS_SEPARATOR = '   '
  value: string = ''

  // returning false in an event handler means it's ignored/discarded

  handleKeypress({ key }: KeyboardEvent) {
    if (key === 'Enter') {
      this.format()
      return false
    }

    return BinarySequence.isBinary(key)
  }

  handlePaste(event: ClipboardEvent) {
    const content =
      event.clipboardData?.getData('text/plain').replaceAll(/\s/g, '') ?? ''
    return BinarySequence.isBinary(content)
  }

  format() {
    const bits = this.value.replaceAll(/\s/g, '').split('')
    const groups = chunks(bits, 8)

    const formattedValue = groups
      .map((group) => group.join(''))
      .join(this.BIT_GROUPS_SEPARATOR)

    this.value = formattedValue
  }
}
