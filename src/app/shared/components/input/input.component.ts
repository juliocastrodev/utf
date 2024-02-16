import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  computed,
  input,
  model,
  viewChild,
} from '@angular/core'
import { AutoResizeDirective } from '../../directives/autoresize/auto-resize.directive'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { ConsistentCaretDirective } from '../../directives/consistent-caret/consistent-caret.directive'

// TODO: move this type somewhere else
export type InputColoredConfig = {
  fromIdx: number
  toIdx: number
  color?: string
  apply?: 'always' | 'afterBlur' // TODO: think how to solve the issue with colors using this...
}

// TODO: right now it's possible to paste stuff like images, formatted text and so on.
// Maybe also scripts, which is not very fun... So it might be a good idea to restrict this

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'utf-input',
  imports: [CommonModule, AutoResizeDirective, ConsistentCaretDirective],
  template: `
    <div
      #divReference
      [contentEditable]="!disabled()"
      [innerHTML]="htmlToDisplay()"
      [ngClass]="classes()"
      (input)="handleInput($any($event))"
      (blur)="onblur.emit($event)"
      [utfAutoResize]="{ dependsOn: htmlToDisplay() }"
      [utfConsistentCaret]="{ dependsOn: htmlToDisplay() }"
    ></div>

    @if (valid() === false && errorMessage()) {
      <span class="block mt-2 font-serif text-error">{{ errorMessage() }}</span>
    }
  `,
})
export class InputComponent {
  divReference = viewChild<ElementRef<HTMLDivElement>>('divReference')

  disabled = input(false)
  valid = input<boolean>()
  errorMessage = input('')
  colored = input<InputColoredConfig>()
  textAlign = input<'center' | 'start'>('center')
  value = model('')

  @Output() onblur = new EventEmitter<FocusEvent>()

  htmlToDisplay = computed<SafeHtml>(() => {
    const currentValue = this.value()
    const currentColored = this.colored()

    if (!currentValue || !currentColored) return currentValue

    const { fromIdx, toIdx, color = 'red' } = currentColored

    const beforeIdx = currentValue.slice(0, fromIdx)
    const textToColor = currentValue.slice(fromIdx, toIdx + 1)
    const afterIdx = currentValue.slice(toIdx + 1, currentValue.length)

    const newHtmlToDisplay =
      beforeIdx +
      `<span class="text-accent" style="color: ${color};">${textToColor}</span>` +
      afterIdx

    return this.sanitizer.bypassSecurityTrustHtml(newHtmlToDisplay)
  })

  classes = computed(() => {
    const defaultClasses = [
      'min-h-[70px] min-w-[210px]',
      'sm:min-h-[100px] sm:min-w-[300px]',
      'w-full overflow-hidden break-all',
      'font-serif text-accent whitespace-pre-wrap',
      'p-4 outline-none bg-background',
      'border-b-2 hover:border-b-4',
      'focus:border-b-4',
    ]

    const textAlignClasses =
      this.textAlign() === 'center' ? ['text-center'] : ['text-start']

    const validityClasses =
      this.valid() === false
        ? ['text-error border-error']
        : ['text-primary border-primary']

    const disabledClasses = this.disabled() ? ['opacity-50'] : []

    return {
      [defaultClasses.join(' ')]: true,
      [validityClasses.join(' ')]: true,
      [textAlignClasses.join(' ')]: true,
      [disabledClasses.join(' ')]: true,
    }
  })

  constructor(private sanitizer: DomSanitizer) {}

  handleInput(event: InputEvent) {
    // When isComposing is true user is typing a composed sequence. For example,
    // while typing á by pressing ' and then a. This condition skips capturing
    // the ' so the user can continue and type the rest.
    if (event.isComposing) return

    const newValue = this.divReference()?.nativeElement.textContent ?? ''
    this.value.set(newValue)
  }
}
