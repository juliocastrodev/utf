import { Component } from '@angular/core'

@Component({
  standalone: true,
  selector: 'utf-section',
  template: ` <ng-content /> `,
  styles: `
    :host {
      @apply p-4 border-4 border-dotted border-primary;
    }
  `,
})
export class SectionComponent {}
