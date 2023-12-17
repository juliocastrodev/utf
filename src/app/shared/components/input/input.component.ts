import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  standalone: true,
  selector: 'utf-input',
  imports: [CommonModule, FormsModule],
  styles: `
    :host {
      @apply block w-full;
    }
  `,
  template: `
    <input
      [ngModel]="value"
      (ngModelChange)="valueChange.emit($event)"
      [disabled]="disabled"
      [ngClass]="[
        'w-full',
        'outline-none',
        'bg-background',
        'text-center font-serif',
        'border-b-primary border-b-2',
        'hover:border-b-4 focus:border-b-4',
        'disabled:opacity-50'
      ]"
    />
  `,
})
export class InputComponent {
  @Input() value = ''
  @Output() valueChange = new EventEmitter<string>()

  @Input() disabled = false
}
