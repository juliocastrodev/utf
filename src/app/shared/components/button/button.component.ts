import { clsx } from 'clsx'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core'

// TODO: migrate all components from [ngClass] to [class] using
// clsx (remember to also remove CommonsModule)

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'utf-button',
  template: ` <button [disabled]="disabled()" [class]="classes()">
    <ng-content />
  </button>`,
})
export class ButtonComponent {
  variant = input<'square' | 'circle' | 'plain'>('square')
  disabled = input(false)

  classes = computed(() => {
    const defaultClasses = ['outline-none text-primary']

    const borderClasses = [
      'border-2 border-solid border-primary',
      'hover:text-background hover:bg-primary',
      'focus-visible:text-background focus-visible:bg-primary',
    ]

    const squareClasses = ['w-full h-full py-4 px-8', ...borderClasses]

    const circleClasses = ['p-1 rounded-full', ...borderClasses]

    const plainClasses = ['hover:font-bold focus-visible:font-bold']

    const disabledClasses = ['opacity-80']

    return clsx(
      defaultClasses,
      this.variant() === 'square' && squareClasses,
      this.variant() === 'circle' && circleClasses,
      this.variant() === 'plain' && plainClasses,
      this.disabled() && disabledClasses,
    )
  })
}
