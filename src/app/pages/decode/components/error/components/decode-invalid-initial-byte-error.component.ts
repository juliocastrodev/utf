import { Component, Input } from '@angular/core'
import { InvalidInitialUtf8ByteError } from '../../../../../domain/error/InvalidInitialUtf8ByteError'
import { SequenceComponent } from '../../../../../shared/components/sequence/sequence.component'
import { Utf8Template } from '../../../../../domain/Utf8Template'

@Component({
  selector: 'utf-decode-invalid-initial-byte-error',
  standalone: true,
  imports: [SequenceComponent],
  template: `
    <div class="flex flex-col gap-4">
      <p>
        Se ha detectado que el siguiente byte está en una
        <span class="underline text-secondary">posición inicial</span>:
      </p>

      <utf-sequence [show]="getInvalidInitialByte()" />

      <p>
        En UTF-8, todo byte inicial ha de empezar con un
        <span class="underline text-secondary">prefijo válido</span> y este
        <span class="underline text-secondary">no lo tiene.</span>
      </p>

      <p>
        Por favor modifícalo para que concuerde con alguno de los prefijos
        válidos:
      </p>

      @for (validInitialByte of getAllPossibleInitialBytes(); track $index) {
        <utf-sequence
          [show]="validInitialByte"
          [colors]="{ '0': 'blue', '1': 'blue' }"
        />
      }
    </div>
  `,
})
export class DecodeInvalidInitialByteErrorComponent {
  @Input({ required: true }) error!: InvalidInitialUtf8ByteError

  getInvalidInitialByte() {
    return this.error.byte
  }

  getAllPossibleInitialBytes() {
    return Utf8Template.all().map((template) => template.getByteAt(0))
  }
}
