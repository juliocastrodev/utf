import { Component, Input } from '@angular/core'
import { SequenceComponent } from '../../../../../shared/components/sequence/sequence.component'
import { MismatchUtf8TemplateError } from '../../../../../domain/error/MismatchUtf8TemplateError'
import { Utf8Template } from '../../../../../domain/Utf8Template'

@Component({
  selector: 'utf-decode-mismatch-template-error',
  standalone: true,
  imports: [SequenceComponent],
  template: `
    <div class="flex flex-col gap-4">
      <p>Se ha detectado un error en la siguiente secuencia de bytes:</p>

      <utf-sequence [show]="getSequenceAllBits()" [groupSize]="8" />

      <p>
        El primer byte es un byte inicial, que coincide con la siguiente
        plantilla utf-8:
      </p>

      <utf-sequence [show]="getTemplate().getByteAt(0)" />

      <p>
        Esto indica que han de haber exactamente
        {{ getTemplate().countIntermediateBytes() }} bytes intermedios después
        de éste
      </p>

      <p>
        Un byte intermedio es básicamente un byte que tenga el siguiente
        prefijo:
      </p>

      <utf-sequence [show]="getTemplate().getByteAt(1)" />

      <p>
        En este caso, los bytes intermedios no lo cumplen. Por favor ajusta los
        bytes intermedios.
      </p>

      <p>
        Si esta no es la plantilla que esperabas que se aplicase. Ajusta el byte
        inicial y, luego, los bytes intermedios respetando los prefijos utf-8.
      </p>
    </div>
  `,
})
export class DecodeMismatchTemplateErrorComponent {
  @Input({ required: true }) error!: MismatchUtf8TemplateError

  getSequenceAllBits() {
    return this.error.params.sequence.getBits()
  }

  getSequenceFirstByte() {
    return this.error.params.sequence.groupInBytes()[0]
  }

  getTemplate() {
    return Utf8Template.forInitialByte(this.getSequenceFirstByte())
  }
}
