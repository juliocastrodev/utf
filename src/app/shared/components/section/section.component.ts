import { Component } from '@angular/core'

@Component({
  standalone: true,
  selector: 'utf-section',
  template: `
    <section class="p-4 border-4 border-dotted border-primary">
      <ng-content />
    </section>
  `,
})
export class SectionComponent {}
