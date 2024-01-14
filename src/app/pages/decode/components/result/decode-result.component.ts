import { Component, Input } from '@angular/core'
import { SectionComponent } from '../../../../shared/components/section/section.component'
import { Utf8Text } from '../../../../domain/Utf8Text'

@Component({
  selector: 'utf-decode-result',
  standalone: true,
  imports: [SectionComponent],
  template: `
    <utf-section classes="flex flex-col gap-4">
      <p>
        result:
        <span class="text-secondary font-serif">{{
          text.getOriginalText()
        }}</span>
      </p>
    </utf-section>
  `,
})
export class DecodeResultComponent {
  // TODO: probably I need to pass something else (potentially more stuff...)
  @Input({ required: true }) text!: Utf8Text
}
