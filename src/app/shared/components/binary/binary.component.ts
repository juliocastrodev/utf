import { Component, Input } from '@angular/core'
import { Bit } from '../../../domain/Binary'
import { CommonModule } from '@angular/common'

@Component({
  standalone: true,
  selector: 'utf-binary',
  imports: [CommonModule],
  template: `
    <div class="flex gap-6 flex-wrap">
      @for (byte of groupInBytes(); track $index) {
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

  groupInBytes() {
    const bytes: Bit[][] = []
    for (let i = 0; i < this.bits.length; i += 8) {
      const byte = this.bits.slice(i, i + 8)
      bytes.push(byte)
    }

    return bytes
  }
}
