import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  standalone: true,
  selector: 'utf-section',
  imports: [CommonModule],
  template: `
    <section [ngClass]="['p-4 border-4 border-dotted border-primary', classes]">
      <ng-content />
    </section>
  `,
})
export class SectionComponent {
  @Input() classes = ''
}
