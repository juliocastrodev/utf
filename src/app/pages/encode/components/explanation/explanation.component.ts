import { Component, Input } from '@angular/core'
import { EncodingResult } from '../../../../shared/services/encoding/encoding.service'
import { SectionComponent } from '../../../../shared/components/section/section.component'

@Component({
  selector: 'utf-explanation',
  standalone: true,
  imports: [SectionComponent],
  template: `
    <utf-section>
      <p>
        El texto
        <span class="font-serif">"{{ encoding.originalText }}"</span> está
        compuesto por un número total de
        {{ encoding.codepoints.length }} codepoints:
      </p>

      <ol>
        @for (codepoint of encoding.codepoints; track $index) {
          <li class="font-serif">
            {{ codepoint.original.getOriginalText() }}:
            {{ codepoint.original }}
          </li>
        }
      </ol>
    </utf-section>

    @for (codepoint of encoding.codepoints; track $index) {
      <utf-section>
        <h3>{{ codepoint.original.getOriginalText() }}</h3>
        <h3>{{ codepoint.original }}</h3>
        <h3>{{ codepoint.encoded }}</h3>
      </utf-section>
    }
    <utf-section>
      <h3>Final result: {{ encoding.encodedText }}</h3>
    </utf-section>
  `,
})
export class ExplanationComponent {
  @Input({ required: true }) encoding!: EncodingResult
}
