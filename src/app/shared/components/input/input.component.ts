import { CommonModule, DOCUMENT } from '@angular/common'
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
  computed,
  effect,
  signal,
} from '@angular/core'
import { AutoResizeDirective } from '../../directives/autoresize/auto-resize.directive'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  standalone: true,
  selector: 'utf-input',
  imports: [CommonModule, AutoResizeDirective],
  template: `
    <div
      #divReference
      [contentEditable]="!disabled"
      (input)="handleInput($any($event))"
      (focusin)="handleFocus()"
      (blur)="handleBlur($event)"
      [innerHTML]="htmlToDisplay()"
      [utfAutoResize]="{ dependsOn: [currentValue(), htmlToDisplay()] }"
      [ngClass]="getClasses()"
    ></div>

    @if (valid === false && errorMessage) {
      <span class="block mt-2 font-serif text-error">{{ errorMessage }}</span>
    }
  `,
})
export class InputComponent {
  @ViewChild('divReference') divReference?: ElementRef<HTMLDivElement>

  @Input() disabled = false
  @Input() valid?: boolean
  @Input() errorMessage = ''
  @Input() colored?: { fromIdx: number; toIdx: number; color?: string }
  @Input() textAlign: 'center' | 'start' = 'center'
  @Output() onblur = new EventEmitter<FocusEvent>()

  @Input() set value(newValue: string) {
    this.currentValue.set(newValue)
  }
  @Output() valueChange = new EventEmitter<string>()

  currentValue = signal('')

  caretPosition = signal(0)

  htmlToDisplay = computed<SafeHtml>(() => {
    const currentInputValue = this.currentValue()

    if (!this.colored || !currentInputValue) {
      return currentInputValue
    }

    const { fromIdx, toIdx, color = 'red' } = this.colored

    const beforeIdx = currentInputValue.slice(0, fromIdx)
    const textToColor = currentInputValue.slice(fromIdx, toIdx + 1)
    const afterIdx = currentInputValue.slice(
      toIdx + 1,
      currentInputValue.length,
    )

    const newHtmlToDisplay =
      beforeIdx +
      `<span class="text-accent" style="color: ${color};">${textToColor}</span>` +
      afterIdx

    return this.sanitizer.bypassSecurityTrustHtml(newHtmlToDisplay)
  })

  private htmlEffect = effect(() => {
    if (!this.htmlToDisplay()) return

    this.restoreCaretPosition()
  })

  hasFocus = signal(false)

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private sanitizer: DomSanitizer,
  ) {}

  // TODO: right now it's possible to paste stuff like images, formatted text and so on.
  // Maybe also scripts, which is not very fun... So it might be a good idea to restrict this
  handleInput(event: InputEvent) {
    // When isComposing is true user is typing a composed sequence. For example,
    // while typing á by pressing ' and then a. This condition skips capturing
    // the ' so the user can continue and type the rest.
    if (event.isComposing) return

    const divRef = event.target as HTMLDivElement
    const newValue = divRef.textContent ?? ''

    this.value = newValue
    this.valueChange.emit(newValue)
    this.storeCaretPosition()
  }

  handleFocus() {
    this.hasFocus.set(true)
  }

  handleBlur(e: FocusEvent) {
    this.hasFocus.set(false)
    this.onblur.emit(e)
  }

  getClasses() {
    const defaultClasses = [
      'min-h-[70px] min-w-[210px]',
      'sm:min-h-[100px] sm:min-w-[300px]',
      'w-full overflow-hidden break-all',
      'font-serif text-accent whitespace-pre-wrap',
      'p-4 outline-none bg-background',
      'border-b-2 hover:border-b-4',
    ]

    const textAlignClasses =
      this.textAlign === 'center' ? ['text-center'] : ['text-start']

    const validityClasses =
      this.valid === false
        ? ['text-error border-error']
        : ['text-primary border-primary']

    const focusClasses = ['border-b-4']

    const disabledClasses = ['opacity-50']

    return {
      [defaultClasses.join(' ')]: true,
      [validityClasses.join(' ')]: true,
      [textAlignClasses.join(' ')]: true,
      [disabledClasses.join(' ')]: this.disabled,
      [focusClasses.join(' ')]: this.hasFocus(),
    }
  }

  // This store/restore logic is needed because the browser moves the
  // caret to the beginning of the contentEditable element when it's
  // content is modified with code. So we need to store the position
  // before the modification and restore it afterwards
  private storeCaretPosition() {
    const selection = this.document.getSelection()

    if (!selection || !this.divReference) return

    // Attatch Selection object to the div to track caret
    selection.extend(this.divReference.nativeElement)

    const caretPosition = selection.toString().length
    this.caretPosition.set(caretPosition)
  }

  private restoreCaretPosition() {
    const selection = this.document.getSelection()

    if (!selection) return

    setTimeout(() => {
      for (let i = 0; i < this.caretPosition(); i++)
        selection.modify('move', 'forward', 'character')
    })
  }
}
