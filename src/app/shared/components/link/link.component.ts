import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  standalone: true,
  selector: 'utf-link',
  imports: [CommonModule],
  template: ` <a
    [href]="href"
    [ngClass]="[
      'cursor-pointer underline',
      'outline-none',
      'hover:decoration-4 focus:decoration-4'
    ]"
  >
    <ng-content />
  </a>`,
})
export class LinkComponent {
  @Input() href = ''
}
