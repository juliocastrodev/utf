import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { chunks } from '../../../domain/utils/chunks'

type SequenceElement = { character: string; color?: string }

/**
 * This component displays a sequence of characters putting each one
 * in an independent box with a retro style.
 *
 * Available options:
 *
 * @property {string|string[]} show - these are the characters to be shown. They
 * can be specified with a regular string or with an array of characters
 *
 * @property {number|undefined} groupSize - characters can be optionally grouped
 *
 * @property {Array<string|undefined>|Record<string,string|undefined>} colors -
 * characters can be optionally colored. These colors can be specified with an
 * array matching the positions of the characters. Or with an object, mapping
 * characters to colors. A color is just a CSS string or undefined.
 *
 * Usage examples:
 * @example
 * <utf-sequence show="hello" />
 *
 * @example
 * <utf-sequence show="11110000" [groupSize]="4" />
 *
 * @example
 * <utf-sequence show="10xxxxxx" [colors]="{ x: 'blue' }" />
 *
 * @example
 * <utf-sequence [show]="['v', 'e', 'n']" [colors]="['yellow', 'blue', 'red']" />
 */
@Component({
  standalone: true,
  selector: 'utf-sequence',
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-4">
      @for (group of getGroups(); track $index) {
        <div class="flex flex-wrap">
          @for (elem of group; track $index) {
            <span
              [ngClass]="[
                'p-2',
                'font-retro text-xl',
                'border-dashed border-primary border-2'
              ]"
              [ngStyle]="{ color: elem.color }"
              >{{ elem.character }}</span
            >
          }
        </div>
      }
    </div>
  `,
})
export class SequenceComponent {
  @Input() show: string | string[] = []
  @Input() groupSize?: number
  @Input() colors?:
    | Array<string | undefined>
    | Record<string, string | undefined>

  getGroups() {
    const elements = this.getElements()

    if (!this.groupSize) return [elements]

    return chunks(elements, this.groupSize)
  }

  private getElements(): SequenceElement[] {
    const charactersArray =
      typeof this.show === 'string' ? this.show.split('') : this.show

    return charactersArray.map((character, index) => ({
      character,
      color: this.findColorForCharacterAt(index),
    }))
  }

  private findColorForCharacterAt(idx: number) {
    if (!this.colors) return undefined

    if (Array.isArray(this.colors)) {
      return this.colors[idx]
    }

    const character = this.show[idx]
    return this.colors[character]
  }
}
