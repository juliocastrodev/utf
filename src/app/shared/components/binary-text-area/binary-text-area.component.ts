import { Component, EventEmitter, Output } from '@angular/core'
import { TextAreaComponent } from '../text-area/text-area.component'
import { BinarySequence, Bit } from '../../../domain/BinarySequence'
import { chunks } from '../../../domain/utils/chunks'

// TODO: display error message if user attempts to input stuff that is not binary

@Component({
  standalone: true,
  selector: 'utf-binary-text-area',
  imports: [TextAreaComponent],
  template: `
    <utf-text-area
      [(value)]="value"
      (keypress)="handleKeypress($event)"
      (paste)="handlePaste($event)"
      (onblur)="formatAndSubmit()"
    />
  `,
})
export class BinaryTextAreaComponent {
  @Output() onsubmit = new EventEmitter<BinarySequence>()

  value = ''

  // returning false in an event handler means it's ignored/discarded
  handleKeypress({ key }: KeyboardEvent) {
    if (key === 'Enter') {
      this.formatAndSubmit()
      return false
    }

    return BinarySequence.isBinary(key)
  }

  handlePaste(event: ClipboardEvent) {
    const content =
      event.clipboardData?.getData('text/plain').replaceAll(/\s/g, '') ?? ''

    return BinarySequence.isBinary(content)
  }

  formatAndSubmit() {
    const binarySequence = this.getBinarySequence()

    const byteSizeChunks = chunks(binarySequence.getBits(), 8)
    const byteSizeChunksStr = byteSizeChunks.map((chunk) => chunk.join(''))
    const formattedValue = byteSizeChunksStr.join('   ')

    this.value = formattedValue
    this.onsubmit.emit(binarySequence)
  }

  private getBinarySequence() {
    const bits = this.value.replaceAll(/\s/g, '').split('') as Bit[]
    return new BinarySequence(bits)
  }
}
