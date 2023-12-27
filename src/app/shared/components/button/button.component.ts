import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  standalone: true,
  selector: 'utf-button',
  imports: [CommonModule],
  template: ` <button [disabled]="disabled" [ngClass]="getClasses()">
    <ng-content />
  </button>`,
})
export class ButtonComponent {
  @Input() variant: 'square' | 'circle' = 'square'
  @Input() disabled = false

  getClasses() {
    const defaultClasses = [
      'outline-none',
      'border-2 border-solid border-primary',
      'hover:text-background hover:bg-primary',
      'focus-visible:text-background focus-visible:bg-primary',
    ].join(' ')

    const squareClasses = ['w-full', 'py-4', 'px-8'].join(' ')

    const circleClasses = ['p-2', 'rounded-full'].join(' ')

    const disabledClasses = ['opacity-80'].join('')

    return {
      [defaultClasses]: true,
      [squareClasses]: this.variant === 'square',
      [circleClasses]: this.variant === 'circle',
      [disabledClasses]: this.disabled,
    }
  }
}
