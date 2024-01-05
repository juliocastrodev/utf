import { Component, EventEmitter, Input, Output } from '@angular/core'
import { InputComponent } from '../input/input.component'
import { BinarySequence } from '../../../domain/BinarySequence'
import { chunks } from '../../../domain/utils/chunks'

// TODO: display error message if user attempts to input stuff that is not binary.
// TODO2: admit a color property to use it when some bits are wrong

@Component({
  standalone: true,
  selector: 'utf-binary-text-area',
  imports: [InputComponent],
  template: `
    <utf-input
      [(value)]="value"
      (onblur)="formatAndSubmit()"
      (keypress)="handleKeypress($event)"
      (paste)="handlePaste($event)"
      [colored]="{ match: 'todo' }"
      textAlign="start"
    />
  `,
})
export class BinaryTextAreaComponent {
  @Output() onsubmit = new EventEmitter<BinarySequence>()
  @Input() invalid?: BinarySequence

  value = ''

  // TODO: don't do this. show an error instead
  // returning false in an event handler means it's ignored/discarded
  handleKeypress({ key }: KeyboardEvent) {
    if (key === 'Enter') {
      this.formatAndSubmit()
      return false
    }

    return this.shouldAcceptInput(key)
  }

  handlePaste(event: ClipboardEvent) {
    const content =
      event.clipboardData?.getData('text/plain').replaceAll(/\s/g, '') ?? ''

    return this.shouldAcceptInput(content)
  }

  formatAndSubmit() {
    const binarySequence = this.getBinarySequence()
    const formattedValue = chunks(binarySequence.getBits(), 8)
      .map((chunk) => chunk.join(''))
      .join('&nbsp;'.repeat(3))

    this.value = formattedValue
    this.onsubmit.emit(binarySequence)
  }

  private shouldAcceptInput(input: string) {
    return /\s/g.test(input) || BinarySequence.isBinary(input)
  }

  private getBinarySequence() {
    const bits = BinarySequence.extractBitsFrom(this.value)
    return new BinarySequence(bits)
  }
}
