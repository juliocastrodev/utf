import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'utf-link',
  imports: [CommonModule],
  template: ` <a
    [href]="href"
    [ngClass]="[
      'underline outline-none',
      'hover:decoration-4 focus:decoration-4'
    ]"
  >
    <ng-content />
  </a>`,
})
export class LinkComponent {
  @Input() href = ''
}
