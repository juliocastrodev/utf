import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { chunks } from '../../../domain/utils/chunks'

type SequenceElement = { show: string; color?: string }

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
              >{{ elem.show }}</span
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
  @Input() colors?: Array<string | undefined>

  getGroups() {
    const elements = this.getElements()

    if (!this.groupSize) return [elements]

    return chunks(elements, this.groupSize)
  }

  private getElements(): SequenceElement[] {
    const showArray =
      typeof this.show === 'string' ? this.show.split('') : this.show

    return showArray.map((show, index) => ({
      show,
      color: this.colors?.[index],
    }))
  }
}
