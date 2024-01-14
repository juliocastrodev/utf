import { Component, EventEmitter, Input, Output } from '@angular/core'
import { SectionComponent } from '../../../../shared/components/section/section.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { Utf8Text } from '../../../../domain/Utf8Text'
import { Utf8Codepoint } from '../../../../domain/Utf8Codepoint'
import { ClipboardComponent } from '../../../../shared/components/clipboard/clipboard.component'
import { ExpandableListComponent } from '../../../../shared/components/expandable-list/expandable-list.component'
import { ExpandableListItemComponent } from '../../../../shared/components/expandable-list/expandable-list-item.component'
import { ExpandableTextComponent } from '../../../../shared/components/expandable-text/expandable-text.component'

@Component({
  selector: 'utf-encode-result',
  standalone: true,
  imports: [
    SectionComponent,
    ButtonComponent,
    ClipboardComponent,
    ExpandableListComponent,
    ExpandableListItemComponent,
    ExpandableTextComponent,
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
        classes="grid gap-2 grid-cols-auto-fill-150 sm:grid-cols-auto-fill-200"
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
        <utf-expandable-text
          classes="text-h3 text-secondary"
          [text]="encodedText.getEncoding().toString()"
        />

        <utf-clipboard
          class="ml-auto"
          [copy]="encodedText.getEncoding().toString()"
        />
      </div>
    </utf-section>
  `,
})
export class EncodeResultComponent {
  @Input({ required: true }) encodedText!: Utf8Text
  @Output() selectcodepoint = new EventEmitter<Utf8Codepoint>()
}
