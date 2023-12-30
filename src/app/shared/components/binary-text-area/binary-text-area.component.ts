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

    const groups: Bit[][] = []
    let group: Bit[] = []
    for (let i = bits.length - 1; i >= 0; i--) {
      group.unshift(bits[i])

      if (group.length === 8) {
        groups.unshift(group)
        group = []
      }
    }
    if (group.length > 0) groups.unshift(group)

    this.value = groups.map((group) => group.join('')).join(' ')
  }

  private getBits() {
    return this.value.replaceAll(' ', '').split('') as Bit[]
  }
}
