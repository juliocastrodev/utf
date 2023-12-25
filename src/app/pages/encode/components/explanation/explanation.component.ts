import { Component, Input } from '@angular/core'
import { SectionComponent } from '../../../../shared/components/section/section.component'
import { EncodedCodepoint } from '../../../../domain/encoding/EncodedCodepoint'
import { BinaryComponent } from '../../../../shared/components/binary/binary.component'

@Component({
  standalone: true,
  selector: 'utf-explanation',
  imports: [SectionComponent, BinaryComponent],
  template: `
    <utf-section class="flex flex-col gap-4">
      <div class="flex gap-2">
        <h3>Encoding of</h3>
        <h3 class="font-serif">
          {{ encodedCodepoint.getCodepoint().getOriginalText() }}
        </h3>
      </div>

      <div>
        <utf-binary [bits]="encodedCodepoint.getEncoding()" />
      </div>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </utf-section>
  `,
})
export class ExplanationComponent {
  @Input({ required: true }) encodedCodepoint!: EncodedCodepoint
}
