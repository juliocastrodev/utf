import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  input,
  model,
  signal,
  untracked,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'utf-binary-input',
  imports: [InputComponent],
  template: `
    <utf-input
      textAlign="start"
      [colored]="inputColors()"
      [valid]="valid()"
      [errorMessage]="errorMessage()"
      [(value)]="inputValue"
      (valueChange)="syncBinarySequenceWithInput()"
      (onblur)="handleBlur($event)"
      (keypress)="handleKeypress($event)"
    />
  `,
})
export class BinaryInputComponent {
  colored = input<{ fromBitAt: number; toBitAt: number; color?: string }>()

  sequence = model(BinarySequence.empty())
  valid = model<boolean>()
  errorMessage = model('')

  @Output() onblur = new EventEmitter<FocusEvent>()

  inputValue = signal('')
  inputColors = computed(() => {
    const currentSequence = untracked(this.sequence)
    const coloredConfig = this.colored()

    if (!coloredConfig || currentSequence.isEmpty()) return

    const { fromBitAt, toBitAt, color = 'red' } = coloredConfig

    const bits: string[] = currentSequence.getBits()
    bits[fromBitAt] = 'x'
    bits[toBitAt] = 'y'
    const formattedMarkedBits = chunks(bits, 8)
      .map((chunk) => chunk.join(''))
      .join('   ')

    return {
      fromIdx: formattedMarkedBits.indexOf('x'),
      toIdx: formattedMarkedBits.indexOf('y'),
      color,
    }
  })

  // Returning false in an event handler means it's ignored/discarded.
  // In this case we ignore Enter keypresses
  handleKeypress({ key }: KeyboardEvent) {
    return key !== 'Enter'
  }

  handleBlur(event: FocusEvent) {
    this.format()

    this.onblur.emit(event)
  }

  syncBinarySequenceWithInput() {
    const currentInput = this.inputValue()

    if (!currentInput) {
      this.valid.set(undefined)
      this.sequence.set(BinarySequence.empty())
      return
    }

    const isInputOnlyMadeOfBitsOrSeparators = /^(0|1|\s)+$/.test(currentInput)
    if (!isInputOnlyMadeOfBitsOrSeparators) {
      this.valid.set(false)
      this.errorMessage.set('Solo se permiten bits (0s y 1s)')
      this.sequence.set(BinarySequence.empty())
      return
    }

    this.valid.set(true)
    this.sequence.set(BinarySequence.extractBitsFrom(currentInput))
  }

  private format() {
    if (!this.valid()) return

    const formattedValue = chunks(this.sequence().getBits(), 8)
      .map((chunk) => chunk.join(''))
      .join('   ')

    this.inputValue.set(formattedValue)
  }
}
