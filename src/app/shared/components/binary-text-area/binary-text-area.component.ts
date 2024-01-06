import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core'
import { InputComponent } from '../input/input.component'
import { BinarySequence } from '../../../domain/BinarySequence'
import { chunks } from '../../../domain/utils/chunks'

// TODO2: admit a color property to use it when some bits are wrong

@Component({
  standalone: true,
  selector: 'utf-binary-text-area',
  imports: [InputComponent],
  template: `
    <utf-input
      textAlign="start"
      [value]="inputValue"
      (valueChange)="handleInput($event)"
      (keypress)="handleKeypress($event)"
      (onblur)="format()"
      [colored]="{ match: 'TODO' }"
      [valid]="isValid()"
      errorMessage="Solo se permiten bits (0s y 1s)"
    />
  `,
})
export class BinaryTextAreaComponent implements OnChanges {
  @Input() sequence = BinarySequence.empty()
  @Output() sequenceChange = new EventEmitter<BinarySequence>()

  inputValue = ''

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sequence']) {
      this.inputValue = this.sequence.getBits().join('')
      this.format()
    }
  }

  handleInput(newValue: string) {
    this.inputValue = newValue

    if (this.isValid()) {
      const newBits = BinarySequence.extractBitsFrom(this.inputValue)
      const newBinarySequence = new BinarySequence(newBits)

      this.sequence = newBinarySequence
      this.sequenceChange.emit(this.sequence)
    }
  }

  // returning false in an event handler means it's ignored/discarded
  handleKeypress({ key }: KeyboardEvent) {
    // ignore Enter keypress
    return key !== 'Enter'
  }

  isValid() {
    if (!this.inputValue) return undefined

    const inputIsOnlyMadeOfBitsOrSeparators = /^(0|1|\s)+$/.test(
      this.inputValue,
    )
    return inputIsOnlyMadeOfBitsOrSeparators
  }

  format() {
    if (!this.isValid()) return

    const formattedValue = chunks(this.sequence.getBits(), 8)
      .map((chunk) => chunk.join(''))
      .join('   ')

    this.inputValue = formattedValue
  }
}
