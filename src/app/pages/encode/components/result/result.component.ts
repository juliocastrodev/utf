import { Component, EventEmitter, Input, Output } from '@angular/core'
import { SectionComponent } from '../../../../shared/components/section/section.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { EncodedText } from '../../../../domain/encoding/EncodedText'
import { EncodedCodepoint } from '../../../../domain/encoding/EncodedCodepoint'
import { FormatBitsPipe } from '../../../../shared/pipes/format-bits.pipe'

@Component({
  selector: 'utf-result',
  standalone: true,
  imports: [SectionComponent, ButtonComponent, FormatBitsPipe],
  template: `
    <utf-section class="flex flex-col gap-4">
      <p>
        El texto
        <span class="font-serif">"{{ encodedText.getOriginalText() }}"</span>
        está compuesto por un número total de
        {{ encodedText.countCodepoints() }} codepoints:
      </p>

      <ol class="flex flex-wrap gap-2">
        @for (
          encodedCodepoint of encodedText.getEncodedCodepoints();
          track $index
        ) {
          <li class="max-w-sm">
            <utf-button (click)="selectcodepoint.emit(encodedCodepoint)">
              <h3 class="font-serif">
                {{ encodedCodepoint.getCodepoint().getCharacter() }}
              </h3>
              <h3>{{ encodedCodepoint.getCodepoint().toString() }}</h3>
            </utf-button>
          </li>
        }
      </ol>

      <p>El resultado final es:</p>

      <h3 class="text-secondary">
        {{ encodedText.getEncoding() | utfFormatBits }}
      </h3>
    </utf-section>
  `,
})
export class ResultComponent {
  @Input({ required: true }) encodedText!: EncodedText
  @Output() selectcodepoint = new EventEmitter<EncodedCodepoint>()
}
