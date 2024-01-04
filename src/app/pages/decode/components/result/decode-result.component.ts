import { Component, Input } from '@angular/core'
import { SectionComponent } from '../../../../shared/components/section/section.component'

@Component({
  selector: 'utf-decode-result',
  standalone: true,
  imports: [SectionComponent],
  template: `
    <utf-section classes="flex flex-col gap-4">
      <p>
        result: <span class="text-secondary font-serif">{{ text }}</span>
      </p>
    </utf-section>
  `,
})
export class DecodeResultComponent {
  // TODO: probably I need to pass something else (potentially more stuff...)
  @Input() text = ''
}
