import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AutoResizeDirective } from '../../directives/autoresize/auto-resize.directive'

@Component({
  standalone: true,
  selector: 'utf-text-area',
  imports: [CommonModule, FormsModule, AutoResizeDirective],
  template: `
    <textarea
      [utfAutoResize]="{ dependsOn: value }"
      [ngModel]="value"
      (ngModelChange)="valueChange.emit($event)"
      [disabled]="disabled"
      (blur)="onblur.emit($event)"
      [ngClass]="[
        'w-full resize-none overflow-hidden',
        'text-center font-serif',
        'p-4 outline-none bg-background',
        'border-b-primary border-b-2',
        'hover:border-b-4 focus:border-b-4',
        'disabled:opacity-50'
      ]"
    ></textarea>
  `,
})
export class TextAreaComponent {
  @Input() value = ''
  @Output() valueChange = new EventEmitter<string>()

  @Input() disabled = false

  @Output() onblur = new EventEmitter<FocusEvent>()
}
