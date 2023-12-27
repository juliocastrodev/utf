import { Component } from '@angular/core'
import { InputComponent } from '../input/input.component'
import { Bit, isBinary } from '../../../domain/Binary'

@Component({
  standalone: true,
  selector: 'utf-binary-input',
  imports: [InputComponent],
  template: `
    <utf-input
      [(value)]="value"
      (keypress)="handleKeypress($event)"
      (paste)="handlePaste($event)"
      (blur)="format()"
    />
  `,
})
export class BinaryInputComponent {
  value: string = ''

  // returning false in an event handler means it's ignored/discarded

  handleKeypress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.format()
      return false
    }

    return isBinary(event.key)
  }

  handlePaste(event: ClipboardEvent) {
    const text = event.clipboardData?.getData('text/plain') ?? ''
    const textWithoutSpaces = text.replaceAll(' ', '')
    return isBinary(textWithoutSpaces)
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
