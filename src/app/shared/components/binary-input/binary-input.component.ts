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
  selector: 'utf-binary-input',
  imports: [InputComponent],
  template: `
    <utf-input
      textAlign="start"
      [value]="inputValue"
      (valueChange)="handleInput($event)"
      (keypress)="handleKeypress($event)"
      (onblur)="format()"
      [colored]="{ match: 'TODO' }"
      [valid]="valid"
      [errorMessage]="errorMessage"
    />
  `,
})
export class BinaryInputComponent implements OnChanges {
  @Input() sequence = BinarySequence.empty()
  @Output() sequenceChange = new EventEmitter<BinarySequence>()

  @Input() valid?: boolean
  @Output() validChange = new EventEmitter<boolean | undefined>()

  @Input() errorMessage = 'Solo se permiten bits (0s y 1s)'

  inputValue = ''

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sequence']) {
      this.inputValue = this.sequence.getBits().join('')
      this.updateValidity()
      this.format()
    }
  }

  // returning false in an event handler means it's ignored/discarded
  handleKeypress({ key }: KeyboardEvent) {
    // ignore Enter keypress as value
    return key !== 'Enter'
  }

  handleInput(newValue: string) {
    this.inputValue = newValue

    this.updateValidity()
    this.updateSequence()
  }

  format() {
    if (!this.valid) return

    const formattedValue = chunks(this.sequence.getBits(), 8)
      .map((chunk) => chunk.join(''))
      .join('   ')

    this.inputValue = formattedValue
  }

  private updateValidity() {
    if (!this.inputValue) {
      this.valid = undefined
      return
    }

    const inputIsOnlyMadeOfBitsOrSeparators = /^(0|1|\s)+$/.test(
      this.inputValue,
    )
    this.valid = inputIsOnlyMadeOfBitsOrSeparators
    this.validChange.emit(this.valid)
  }

  private updateSequence() {
    if (!this.valid) return

    const newBinarySequence = new BinarySequence(
      BinarySequence.extractBitsFrom(this.inputValue),
    )

    this.sequence = newBinarySequence
    this.sequenceChange.emit(this.sequence)
  }
}
