import { Component, Input } from '@angular/core'
import { SectionComponent } from '../../../../shared/components/section/section.component'
import { EncodedCodepoint } from '../../../../domain/encoding/EncodedCodepoint'
import { SequenceComponent } from '../../../../shared/components/sequence/sequence.component'

@Component({
  standalone: true,
  selector: 'utf-explanation',
  imports: [SectionComponent, SequenceComponent],
  template: `
    <utf-section class="flex flex-col gap-4">
      <div class="flex gap-2">
        <h3>Encoding of</h3>
        <h3 class="font-serif">
          {{ encodedCodepoint.getCodepoint().getCharacter() }}
        </h3>
      </div>

      <p>
        El carácter
        <span class="font-serif text-secondary">{{
          encodedCodepoint.getCodepoint().getCharacter()
        }}</span>
        corresponde con el código Unicode
        <span class="text-secondary">{{
          encodedCodepoint.getCodepoint().toString()
        }}</span
        >, este código está en hexadecimal, pero si lo pasamos a binario sería:
      </p>

      <utf-sequence [show]="encodedCodepoint.getCodepoint().toBinary()" />

      @switch (encodedCodepoint.countEncodingBytes()) {
        @case (1) {
          <p>
            El carácter entra dentro del rango de los correspondientes a ASCII.
            Luego, se codifica en UTF-8 de la misma manera en la que lo haría en
            ASCII, es decir, su código unicode asociado (en este caso
            <span class="text-secondary">{{
              encodedCodepoint.getCodepoint().toString()
            }}</span
            >) en binario, que es justo lo que se puede apreciar arriba
          </p>
        }

        @case (2) {
          <p>Para codificarlo en UTF-8 necesitamos un total de 2 bytes</p>

          <utf-sequence show="110xxxxx10xxxxxx" [groupSize]="8" />
        }

        @case (3) {
          <p>Para codificarlo en UTF-8 necesitamos un total de 3 bytes</p>
        }

        @case (4) {
          <p>Para codificarlo en UTF-8 necesitamos un total de 4 bytes</p>
        }
      }
    </utf-section>
  `,
})
export class ExplanationComponent {
  @Input({ required: true }) encodedCodepoint!: EncodedCodepoint
}
