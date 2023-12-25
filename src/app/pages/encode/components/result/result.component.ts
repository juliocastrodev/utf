import { Component, EventEmitter, Input, Output } from '@angular/core'
import { SectionComponent } from '../../../../shared/components/section/section.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { Bit } from '../../../../domain/Bit'
import { EncodedText } from '../../../../domain/encoding/EncodedText'
import { EncodedCodepoint } from '../../../../domain/encoding/EncodedCodepoint'

@Component({
  selector: 'utf-result',
  standalone: true,
  imports: [SectionComponent, ButtonComponent],
  template: `
    <utf-section class="flex flex-col gap-4">
      <p>
        El texto
        <span class="font-serif">"{{ encodedText.getOriginalText() }}"</span>
        está compuesto por un número total de
        {{ encodedText.countCodepoints() }} codepoints:
      </p>

      <ol class="flex flex-wrap gap-2">
        @for (encodedCodepoint of encodedText.getEncodedCodepoints(); track $index) {
          <ul class="max-w-sm">
            <utf-button (click)="selectcodepoint.emit(encodedCodepoint)">
              <h3 class="font-serif">
                {{ encodedCodepoint.getCodepoint().getOriginalText() }}
              </h3>
              <h3>{{ encodedCodepoint.getCodepoint().toString() }}</h3>
            </utf-button>
          </ul>
        }
      </ol>

      <p>El resultado final es:</p>

      <h3 class="text-secondary">
        {{ showPrettyBits(encodedText.getEncoding()) }}
      </h3>
    </utf-section>
  `,
})
export class ResultComponent {
  @Input({ required: true }) encodedText!: EncodedText
  @Output() selectcodepoint = new EventEmitter<EncodedCodepoint>()

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
