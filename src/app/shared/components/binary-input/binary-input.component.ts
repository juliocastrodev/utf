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

// TODO: check all places where I bind function calls and check if they are
// bein called too many times. In general maybe it's a good idea to migrate
// all components to OnPush strategy (using signals may use in this migration).
// Also a good idea is to put a console.log in ngOnChanges and see if it's
// being triggered too many times

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
      (onblur)="format(); onblur.emit($event)"
      [colored]="inputColored"
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
  @Input() colored?: { fromBitAt: number; toBitAt: number; color?: string }

  @Output() onblur = new EventEmitter<FocusEvent>()

  inputValue: InputComponent['value'] = ''
  inputColored: InputComponent['colored']

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sequence']) {
      this.inputValue = this.sequence.getBits().join('')
      this.updateValidity()
      this.format()
    } else if (changes['colored']) {
      this.updateColors()
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
    this.updateColors()
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

  private updateColors() {
    if (!this.colored) {
      this.inputColored = undefined
      return
    }

    const { fromBitAt, toBitAt, color = 'red' } = this.colored

    const bits: string[] = this.sequence.getBits()
    bits[fromBitAt] = 'x'
    bits[toBitAt] = 'y'
    const formattedMarkedBits = chunks(bits, 8)
      .map((chunk) => chunk.join(''))
      .join('   ')

    this.inputColored = {
      fromIdx: formattedMarkedBits.indexOf('x'),
      toIdx: formattedMarkedBits.indexOf('y'),
      color,
    }
  }
}
