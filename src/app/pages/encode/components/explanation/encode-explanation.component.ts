import { Component, Input } from '@angular/core'
import { SectionComponent } from '../../../../shared/components/section/section.component'
import { Utf8Codepoint } from '../../../../domain/Utf8Codepoint'
import { SequenceComponent } from '../../../../shared/components/sequence/sequence.component'
import { ClipboardComponent } from '../../../../shared/components/clipboard/clipboard.component'

@Component({
  standalone: true,
  selector: 'utf-encode-explanation',
  imports: [SectionComponent, SequenceComponent, ClipboardComponent],
  template: `
    <utf-section classes="flex flex-col gap-4">
      <h3>
        Encoding of "<span class="text-h3 font-serif">{{
          getCodepoint().getCharacter()
        }}</span
        >"
      </h3>

      <p>
        El carácter
        <span class="font-serif text-secondary">{{
          getCodepoint().getCharacter()
        }}</span>
        corresponde con el código Unicode
        <span class="text-secondary">{{ getCodepoint().toString() }}</span
        >. Este código está en hexadecimal, pero si lo pasamos a binario sería:
      </p>

      <utf-sequence
        [show]="getCodepoint().toBinary().getBits()"
        [colors]="getColorsForCodepoint()"
      />

      @if (encodedCodepoint.getEncoding().countBytes() == 1) {
        <p>
          El carácter entra dentro del rango de los correspondientes a ASCII.
          Luego, se codifica en UTF-8 de la misma manera en la que lo haría en
          ASCII, es decir, su código unicode asociado (en este caso
          <span class="text-secondary">{{ getCodepoint().toString() }}</span
          >) en binario.
        </p>

        <p>
          Ahora simplemente rellenamos con zeros hasta tener la longitud de
          byte:
        </p>

        <utf-sequence
          [show]="encodedCodepoint.getEncoding().getBits()"
          [colors]="getColorsForEncodingTemplate()"
          [groupSize]="8"
        />
      } @else {
        <p>
          Para codificarlo en UTF-8 necesitamos un total de
          {{ encodedCodepoint.getEncoding().countBytes() }} bytes
        </p>

        <utf-sequence
          [show]="encodedCodepoint.getEncoding().getTemplate().toString()"
          [colors]="getColorsForEncodingTemplate()"
          [groupSize]="8"
        />

        <p>
          Vamos rellenando de derecha a izquierda las x's. Las posiciones que no
          se utilizan se quedan a 0
        </p>

        <utf-sequence
          [show]="encodedCodepoint.getEncoding().getBits()"
          [colors]="getColorsForEncodingTemplate()"
          [groupSize]="8"
        />
      }

      <p>Por lo tanto, nos queda lo siguiente:</p>

      <div class="flex flex-wrap gap-2 items-center">
        <h3 class="text-secondary">
          {{ encodedCodepoint.getEncoding().toString() }}
        </h3>
        <utf-clipboard
          class="ml-auto"
          [copy]="encodedCodepoint.getEncoding().toString()"
        />
      </div>
    </utf-section>
  `,
})
export class EncodeExplanationComponent {
  @Input({ required: true }) encodedCodepoint!: Utf8Codepoint

  getCodepoint() {
    return this.encodedCodepoint.getCodepoint()
  }

  getColorsForCodepoint() {
    let currentColor = 'blue'
    const changeColor = () => {
      if (currentColor === 'blue') currentColor = 'green'
      else if (currentColor === 'green') currentColor = 'red'
      else if (currentColor === 'red') currentColor = 'blue'
    }

    const colors: string[] = []
    for (let i = this.getCodepoint().toBinary().countBits() - 1; i >= 0; i--) {
      colors.unshift(currentColor)

      if (colors.length % 8 === 0) changeColor()
    }

    return colors
  }

  getColorsForEncodingTemplate() {
    const template = this.encodedCodepoint
      .getEncoding()
      .getTemplate()
      .toString()

    const colorsForCodepoint = this.getColorsForCodepoint()
    let colorIndex = colorsForCodepoint.length - 1

    const colors: Array<string | undefined> = []
    for (let i = template.length - 1; i >= 0; i--) {
      colors.unshift(
        template[i] === 'x' ? colorsForCodepoint[colorIndex--] : undefined,
      )
    }

    return colors
  }
}
