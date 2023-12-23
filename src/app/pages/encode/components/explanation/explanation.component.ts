import { Component, Input } from '@angular/core'
import { EncodingResult } from '../../../../shared/services/encoding/encoding.service'
import { SectionComponent } from '../../../../shared/components/section/section.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { Bit } from '../../../../domain/Bit'

@Component({
  selector: 'utf-explanation',
  standalone: true,
  imports: [SectionComponent, ButtonComponent],
  template: `
    <utf-section class="max-w-3xl flex flex-col gap-4">
      <p>
        El texto
        <span class="font-serif">"{{ encoding.originalText }}"</span> está
        compuesto por un número total de
        {{ encoding.codepoints.length }} codepoints:
      </p>

      <ol class="flex flex-wrap gap-2">
        @for (codepoint of encoding.codepoints; track $index) {
          <ul class="max-w-sm">
            <utf-button>
              <h3 class="font-serif">
                {{ codepoint.original.getOriginalText() }}
              </h3>
              <h3>{{ codepoint.original }}</h3>
            </utf-button>
          </ul>
        }
      </ol>

      <p>El resultado final es:</p>

      <h3 class="text-secondary">{{ showPrettyBits(encoding.encodedText) }}</h3>
    </utf-section>
  `,
})
export class ExplanationComponent {
  @Input({ required: true }) encoding!: EncodingResult

  // TODO: maybe move to a pipe
  showPrettyBits(bits: Bit[]) {
    const bytes: Bit[][] = []
    for (let i = 0; i < bits.length; i += 8) {
      const byte = bits.slice(i, i + 8)
      bytes.push(byte)
    }

    return bytes.map((bits) => bits.join('')).join(' ')
  }
}
