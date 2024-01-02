import { Component } from '@angular/core'
import { TextAreaComponent } from '../text-area/text-area.component'
import { Bit, isBinary } from '../../../domain/Binary'

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

    return isBinary(key)
  }

  handlePaste(event: ClipboardEvent) {
    const content =
      event.clipboardData?.getData('text/plain').replaceAll(' ', '') ?? ''
    return isBinary(content)
  }

  format() {
    const bits = this.getBits()

    const groups: string[] = []
    for (let i = 0; i < bits.length; i += 8) {
      const group = bits.slice(i, i + 8).join('')
      groups.push(group)
    }

    this.value = groups.join(this.BIT_GROUPS_SEPARATOR)
  }

  private getBits() {
    return this.value.replaceAll(/\s/g, '').split('') as Bit[]
  }
}
