import { Component } from '@angular/core'
import { SectionComponent } from '../../../../shared/components/section/section.component'

@Component({
  selector: 'utf-decode-result',
  standalone: true,
  imports: [SectionComponent],
  template: `
    <utf-section classes="flex flex-col gap-4">
      <p>result</p>
    </utf-section>
  `,
})
export class DecodeResultComponent {}
