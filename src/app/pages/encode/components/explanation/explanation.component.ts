import { Component, Input } from '@angular/core'
import { SectionComponent } from '../../../../shared/components/section/section.component'
import { EncodedCodepoint } from '../../../../domain/encoding/EncodedCodepoint'
import { SequenceComponent } from '../../../../shared/components/sequence/sequence.component'
import { Utf8Encoder } from '../../../../domain/encoding/Utf8Encoder'

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
        >. Este código está en hexadecimal, pero si lo pasamos a binario sería:
      </p>

      <utf-sequence [show]="encodedCodepoint.getCodepoint().toBinary()" />

      @if (encodedCodepoint.countEncodingBytes() == 1) {
        <p>
          El carácter entra dentro del rango de los correspondientes a ASCII.
          Luego, se codifica en UTF-8 de la misma manera en la que lo haría en
          ASCII, es decir, su código unicode asociado (en este caso
          <span class="text-secondary">{{
            encodedCodepoint.getCodepoint().toString()
          }}</span
          >) en binario.
        </p>

        <p>
          Ahora simplemente rellenamos con zeros hasta tener la longitud de
          byte:
        </p>

        <utf-sequence [show]="encodedCodepoint.getEncoding()" [groupSize]="8" />
      } @else {
        <p>
          Para codificarlo en UTF-8 necesitamos un total de
          {{ encodedCodepoint.countEncodingBytes() }} bytes
        </p>

        <utf-sequence [show]="getUtf8EncodingTemplate()" [groupSize]="8" />

        <p>
          Vamos rellenando de derecha a izquierda las x's. Las posiciones que no
          se utilizan se quedan a 0
        </p>

        <utf-sequence [show]="encodedCodepoint.getEncoding()" [groupSize]="8" />
      }
    </utf-section>
  `,
})
export class ExplanationComponent {
  @Input({ required: true }) encodedCodepoint!: EncodedCodepoint

  getUtf8EncodingTemplate() {
    return Utf8Encoder.templateFor(
      this.encodedCodepoint.getCodepoint().toBinary(),
    )
  }
}
