import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  standalone: true,
  selector: 'utf-input',
  imports: [CommonModule],
  styles: `
    :host {
      width: 100%;
    }
  `,
  template: `
    <input
      [ngClass]="[
        'w-full',
        'outline-none',
        'bg-background',
        'text-center font-mono',
        'border-b-primary border-b-2',
        'hover:border-b-4 focus:border-b-4'
      ]"
      [maxLength]="maxLength"
    />
  `,
})
export class InputComponent {
  @Input() maxLength = 99_999
}
