import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  standalone: true,
  selector: 'utf-button',
  imports: [CommonModule],
  styles: `
    :host {
      width: 100%;
    }
  `,
  template: ` <button
    [ngClass]="[
      'w-full',
      'py-4 px-8',
      'outline-none',
      'border-2 border-solid border-primary',
      'hover:text-background hover:bg-primary',
      'focus-within:text-background focus-within:bg-primary'
    ]"
  >
    <ng-content />
  </button>`,
})
export class ButtonComponent {}
