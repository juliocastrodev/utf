import { Component, EventEmitter, Input, Output } from '@angular/core'
import { SectionComponent } from '../../../../shared/components/section/section.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { EncodedText } from '../../../../domain/encoding/EncodedText'
import { EncodedCodepoint } from '../../../../domain/encoding/EncodedCodepoint'
import { FormatBitsPipe } from '../../../../shared/pipes/format-bits.pipe'
import { ClipboardComponent } from '../../../../shared/components/clipboard/clipboard.component'
import { ExpandableListComponent } from '../../../../shared/components/expandable-list/expandable-list.component'
import { ExpandableListItemComponent } from '../../../../shared/components/expandable-list/expandable-list-item.component'

@Component({
  selector: 'utf-result',
  standalone: true,
  imports: [
    SectionComponent,
    ButtonComponent,
    FormatBitsPipe,
    ClipboardComponent,
    ExpandableListComponent,
    ExpandableListItemComponent,
  ],
  template: `
    <utf-section classes="flex flex-col gap-4">
      <p>
        El texto <span>"</span>
        <span class="font-serif break-all text-secondary">{{
          encodedText.getOriginalText()
        }}</span>
        <span>"</span>
        está compuesto por un número total de
        {{ encodedText.countCodepoints() }} codepoints:
      </p>

      <utf-expandable-list
        classes="grid gap-2 grid-cols-auto-fit-150 sm:grid-cols-auto-fit-200"
      >
        @for (
          encodedCodepoint of encodedText.getEncodedCodepoints();
          track $index
        ) {
          <utf-expandable-list-item>
            <utf-button (click)="selectcodepoint.emit(encodedCodepoint)">
              <h3 class="font-serif whitespace-break-spaces">
                {{ encodedCodepoint.getCodepoint().getCharacter() }}
              </h3>
              <h3>{{ encodedCodepoint.getCodepoint().toString() }}</h3>
            </utf-button>
          </utf-expandable-list-item>
        }
      </utf-expandable-list>

      <p>El resultado final es:</p>

      <div class="flex flex-wrap gap-2 items-center">
        <h3 class="text-secondary">
          {{ encodedText.getEncoding() | utfFormatBits }}
        </h3>
        <utf-clipboard
          class="ml-auto"
          [copy]="encodedText.getEncoding() | utfFormatBits"
        />
      </div>
    </utf-section>
  `,
})
export class ResultComponent {
  @Input({ required: true }) encodedText!: EncodedText
  @Output() selectcodepoint = new EventEmitter<EncodedCodepoint>()
}
