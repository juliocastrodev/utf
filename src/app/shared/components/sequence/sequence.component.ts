import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  standalone: true,
  selector: 'utf-sequence',
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap gap-4">
      @for (group of getGroups(); track $index) {
        <div class="flex flex-wrap">
          @for (elem of group; track $index) {
            <span
              [ngClass]="[
                'p-2',
                'font-retro text-xl',
                'border-dashed border-primary border-2'
              ]"
              >{{ elem }}</span
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

  getGroups() {
    const elements =
      typeof this.show === 'string' ? this.show.split('') : this.show

    if (!this.groupSize) return [elements]

    const groups: string[][] = []
    for (let i = 0; i < elements.length; i += this.groupSize) {
      const group = elements.slice(i, i + this.groupSize)
      groups.push(group)
    }

    return groups
  }
}
