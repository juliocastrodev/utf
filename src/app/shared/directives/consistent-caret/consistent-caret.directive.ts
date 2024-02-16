import { DOCUMENT } from '@angular/common'
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  effect,
  input,
  signal,
  untracked,
} from '@angular/core'

// TODO: convert these comments to /** docs style */

// This store/restore logic is needed because the browser moves the
// caret to the beginning of the contentEditable element when its
// content is modified with code. So we need to store the position
// before the modification and restore it afterwards

@Directive({
  selector: '[utfConsistentCaret]',
  standalone: true,
})
export class ConsistentCaretDirective {
  dependency = input.required<{ dependsOn: unknown }>({
    alias: 'utfConsistentCaret',
  })

  savedCaretPosition = signal<number | undefined>(undefined)

  updateCaretPositionEffect = effect(() => {
    // Only run the effect when dependency changes
    this.dependency()
    const savedPosition = untracked(this.savedCaretPosition)

    // Do nothing if caret is not saved or already well positioned
    if (
      savedPosition === undefined ||
      savedPosition === this.getCurrentCaretPosition()
    )
      return

    this.moveCaretTo(savedPosition)
  })

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    // When isComposing is true user is typing a composed sequence. For example,
    // while typing á by pressing ' and then a. This condition skips capturing
    // the ' so the user can continue and type the rest.
    if (event.isComposing) return

    this.savedCaretPosition.set(this.getCurrentCaretPosition())
  }

  private getCurrentCaretPosition(): number | undefined {
    const selection = this.document.getSelection()
    if (!selection) return undefined

    const hasCaretBeenUsed = selection.rangeCount > 0
    if (!hasCaretBeenUsed) return undefined

    selection.extend(this.elementRef.nativeElement)
    const caretPosition = selection.toString().length

    return caretPosition
  }

  private moveCaretTo(position: number) {
    const selection = this.document.getSelection()

    if (!selection) return

    for (let i = 0; i < position; i++)
      selection.modify('move', 'forward', 'character')
  }
}
