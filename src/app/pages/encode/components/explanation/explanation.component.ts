import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { SectionComponent } from '../../../../shared/components/section/section.component'
import { EncodedCodepoint } from '../../../../domain/encoding/EncodedCodepoint'
import { SequenceComponent } from '../../../../shared/components/sequence/sequence.component'
import { Utf8Encoder } from '../../../../domain/encoding/Utf8Encoder'
import { Bit, groupInBytes } from '../../../../domain/Binary'

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // TODO: put this in every component
  selector: 'utf-explanation',
  imports: [SectionComponent, SequenceComponent],
  template: `
    <utf-section class="flex flex-col gap-4">
      <div class="flex gap-2">
        <h3>Encoding of</h3>
        <h3 class="font-serif">{{ character }}</h3>
      </div>

      <p>
        El carácter
        <span class="font-serif text-secondary">{{ character }}</span>
        corresponde con el código Unicode
        <span class="text-secondary">{{ codepointStr }}</span
        >. Este código está en hexadecimal, pero si lo pasamos a binario sería:
      </p>

      <utf-sequence
        [show]="encodedCodepoint.getCodepoint().toBinary()"
        [colors]="getColorsForBinaryCodepoint()"
      />

      @if (encodedCodepoint.countEncodingBytes() == 1) {
        <p>
          El carácter entra dentro del rango de los correspondientes a ASCII.
          Luego, se codifica en UTF-8 de la misma manera en la que lo haría en
          ASCII, es decir, su código unicode asociado (en este caso
          <span class="text-secondary">{{ codepointStr }}</span
          >) en binario.
        </p>

        <p>
          Ahora simplemente rellenamos con zeros hasta tener la longitud de
          byte:
        </p>

        <utf-sequence
          [show]="encodedCodepoint.getEncoding()"
          [colors]="getColorsForUtf8Template()"
          [groupSize]="8"
        />
      } @else {
        <p>
          Para codificarlo en UTF-8 necesitamos un total de
          {{ encodedCodepoint.countEncodingBytes() }} bytes
        </p>

        <utf-sequence
          [show]="getUtf8EncodingTemplate()"
          [colors]="getColorsForUtf8Template()"
          [groupSize]="8"
        />

        <p>
          Vamos rellenando de derecha a izquierda las x's. Las posiciones que no
          se utilizan se quedan a 0
        </p>

        <utf-sequence
          [show]="encodedCodepoint.getEncoding()"
          [colors]="getColorsForUtf8Template()"
          [groupSize]="8"
        />
      }

      <p>El resultado es:</p>

      <h3 class="text-secondary">
        {{ showPrettyBits(encodedCodepoint.getEncoding()) }}
      </h3>
    </utf-section>
  `,
})
export class ExplanationComponent {
  @Input({ required: true }) encodedCodepoint!: EncodedCodepoint

  get character() {
    return this.encodedCodepoint.getCodepoint().getCharacter()
  }

  get codepointStr() {
    return this.encodedCodepoint.getCodepoint().toString()
  }

  getUtf8EncodingTemplate() {
    return Utf8Encoder.templateFor(
      this.encodedCodepoint.getCodepoint().toBinary(),
    )
  }

  getColorsForBinaryCodepoint() {
    const bits = this.encodedCodepoint.getCodepoint().toBinary()

    const color = {
      current: 'blue',
      change() {
        if (this.current === 'blue') this.current = 'green'
        else if (this.current === 'green') this.current = 'red'
        else if (this.current === 'red') this.current = 'blue'
      },
    }

    const result = []
    for (let i = bits.length - 1; i >= 0; i--) {
      result.unshift(color.current)

      if (result.length % 8 === 0) color.change()
    }

    return result
  }

  getColorsForUtf8Template() {
    const template = this.getUtf8EncodingTemplate()
    const numberOfBitsToColor = this.encodedCodepoint
      .getCodepoint()
      .toBinary().length

    const color = {
      current: 'blue',
      usageCount: 0,
      use() {
        this.usageCount++
        return this.current
      },
      change() {
        if (this.current === 'blue') this.current = 'green'
        else if (this.current === 'green') this.current = 'red'
        else if (this.current === 'red') this.current = 'blue'
      },
    }

    const result: Array<string | undefined> = []
    for (let i = template.length - 1; i >= 0; i--) {
      result.unshift(
        template[i] !== 'x' || color.usageCount >= numberOfBitsToColor
          ? undefined
          : color.use(),
      )

      if (color.usageCount % 8 === 0) color.change()
    }

    return result
  }

  // getColors() {
  //   const codepointBinary = this.encodedCodepoint.getCodepoint().toBinary()
  //   const template = this.getUtf8EncodingTemplate()
  //   const encodingBinary = this.encodedCodepoint.getEncoding()

  //   const numberOfBitsToColor = codepointBinary.length

  //   template.map((val) => (val !== 'x' ? undefined : 'x'))
  // }

  // TODO: maybe move to a pipe
  showPrettyBits(bits: Bit[]) {
    const bytes = groupInBytes(bits)

    return bytes.map((bits) => bits.join('')).join(' ')
  }
}
