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
  @Input() variant: 'square' | 'circle' | 'plain' = 'square'
  @Input() disabled = false

  getClasses() {
    const defaultClasses = ['outline-none']

    const borderClasses = [
      'border-2 border-solid border-primary',
      'hover:text-background hover:bg-primary',
      'focus-visible:text-background focus-visible:bg-primary',
    ]

    const squareClasses = ['w-full h-full py-4 px-8', ...borderClasses]

    const circleClasses = ['p-1 rounded-full', ...borderClasses]

    const plainClasses = ['hover:font-bold focus-visible:font-bold']

    const disabledClasses = ['opacity-80']

    return {
      [defaultClasses.join(' ')]: true,
      [disabledClasses.join(' ')]: this.disabled,
      // TODO: try to solve!
      // Angular and Tailwind seems to have a conflict by doing
      // [squareClasses.join(' ')]: this.variant === 'square' (and so on).
      // Apparently there's class collisions or something...
      ...(this.variant === 'square' && { [squareClasses.join(' ')]: true }),
      ...(this.variant === 'circle' && { [circleClasses.join(' ')]: true }),
      ...(this.variant === 'plain' && { [plainClasses.join(' ')]: true }),
    }
  }
}
