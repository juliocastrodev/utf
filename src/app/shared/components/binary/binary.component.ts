import { Component, Input } from '@angular/core'
import { Bit, groupInBytes } from '../../../domain/Binary'
import { CommonModule } from '@angular/common'

@Component({
  standalone: true,
  selector: 'utf-binary',
  imports: [CommonModule],
  template: `
    <div class="flex gap-6 flex-wrap">
      @for (byte of getBytes(); track $index) {
        <div>
          @for (bit of byte; track $index) {
            <span
              [ngClass]="[
                'p-2',
                'font-retro text-xl',
                'border-dashed border-primary border-4',
                'border-r-0 last-of-type:border-r-4'
              ]"
              >{{ bit }}</span
            >
          }
        </div>
      }
    </div>
  `,
})
export class BinaryComponent {
  @Input() bits: Bit[] = []

  getBytes() {
    return groupInBytes(this.bits)
  }
}
