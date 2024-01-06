import { CommonModule, DOCUMENT } from '@angular/common'
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
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
      (input)="handleInput()"
      (focusin)="handleFocus()"
      (blur)="handleBlur($event)"
      [innerHTML]="htmlToDisplay"
      [utfAutoResize]="{ dependsOn: value }"
      [ngClass]="getClasses()"
    ></div>

    @if (valid === false && errorMessage) {
      <span class="block mt-2 font-serif text-error">{{ errorMessage }}</span>
    }
  `,
})
export class InputComponent implements OnChanges {
  @Input() disabled = false
  @Input() valid?: boolean
  @Input() errorMessage = ''
  @Input() colored?: { color?: string; match: string }
  @Input() textAlign: 'center' | 'start' = 'center'
  @Input() value = ''
  @Output() valueChange = new EventEmitter<string>()
  @Output() onblur = new EventEmitter<FocusEvent>()

  @ViewChild('divReference') divReference?: ElementRef<HTMLDivElement>

  htmlToDisplay?: SafeHtml
  hasFocus = false

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && !this.hasFocus) {
      this.updateHtmlToDisplay()
    }
  }

  updateHtmlToDisplay() {
    if (!this.colored) {
      this.htmlToDisplay = this.value
      return
    }

    const { color = 'red', match: textToColor } = this.colored

    const coloredText = this.value.replaceAll(
      textToColor,
      `<span class="text-accent" style="color: ${color};">${textToColor}</span>`,
    )

    this.htmlToDisplay = this.sanitizer.bypassSecurityTrustHtml(coloredText)
  }

  handleFocus() {
    this.hasFocus = true
    this.moveCaretToEndOfText()
  }

  handleInput() {
    this.value = this.divReference?.nativeElement.textContent ?? ''
    this.valueChange.emit(this.value)
  }

  handleBlur(e: FocusEvent) {
    this.hasFocus = false
    this.onblur.emit(e)
    this.updateHtmlToDisplay()
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
      [focusClasses.join(' ')]: this.hasFocus,
    }
  }

  private moveCaretToEndOfText() {
    const selection = this.document.getSelection()

    if (!selection || !this.divReference) return

    selection.selectAllChildren(this.divReference.nativeElement)
    selection.collapseToEnd()
  }
}
