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

      <utf-binary [bits]="encodedCodepoint.getEncoding()" />

      @switch (encodedCodepoint.countEncodingBytes()) {
        @case (1) {
          <p>
            El carácter entra dentro del rango de los correspondientes a ASCII.
            Luego, se codifica en UTF-8 de la misma manera en la que lo haría en
            ASCII, es decir, su código asociado (en este caso
            <span class="text-secondary">{{
              encodedCodepoint.getCodepoint().toString()
            }}</span
            >) en binario, que es justo lo que se puede apreciar arriba
          </p>
        }

        @case (2) {
          <p>Dos bytes</p>
        }

        @case (3) {
          <p>Tres bytes</p>
        }

        @case (4) {
          <p>Cuatro bytes</p>
        }
      }
    </utf-section>
  `,
})
export class ExplanationComponent {
  @Input({ required: true }) encodedCodepoint!: EncodedCodepoint
}
