import { Component, Input } from '@angular/core'
import { Bit } from '../../../domain/Binary'
import { CommonModule } from '@angular/common'

@Component({
  standalone: true,
  selector: 'utf-binary',
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap">
      @for (bit of this.bits; track $index) {
        <span
          [ngClass]="[
            'p-2',
            'font-retro text-xl',
            'border-dashed border-primary border-2'
          ]"
          >{{ bit }}</span
        >
      }
    </div>
  `,
})
export class BinaryComponent {
  @Input() bits: Bit[] = []
}
