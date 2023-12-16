import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  standalone: true,
  selector: 'utf-input',
  imports: [CommonModule, FormsModule],
  styles: `
    :host {
      width: 100%;
    }
  `,
  template: `
    <input
      [ngModel]="value"
      (ngModelChange)="valueChange.emit($event)"
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

  @Input() value = ''
  @Output() valueChange = new EventEmitter<string>()
}
