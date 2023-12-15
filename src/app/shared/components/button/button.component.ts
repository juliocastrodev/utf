import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  standalone: true,
  selector: 'utf-button',
  styles: `
    :host {
      width: 100%;
    }
  `,
  template: ` <button
    [ngClass]="[
      'w-full',
      'py-4 px-8',
      'border-2 border-solid border-primary',
      'hover:text-background hover:bg-primary'
    ]"
  >
    {{ label }}
  </button>`,
  imports: [CommonModule],
})
export class ButtonComponent {
  @Input() label = ''
}
