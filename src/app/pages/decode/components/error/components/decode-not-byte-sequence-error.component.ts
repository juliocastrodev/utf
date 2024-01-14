import { Component, Input } from '@angular/core'
import { NotByteSequenceError } from '../../../../../domain/error/NotByteSequenceError'
import { SequenceComponent } from '../../../../../shared/components/sequence/sequence.component'

@Component({
  selector: 'utf-decode-not-byte-sequence-error',
  standalone: true,
  imports: [SequenceComponent],
  template: `
    <div class="flex flex-col gap-4">
      <p>
        Por favor introduce una secuencia de bytes (bloques de
        <span class="underline text-secondary">8 bits</span>)
      </p>

      <p>
        Ahora mismo la secuencia introducida tiene un total de
        <span class="underline text-secondary">{{ countBits() }} bits</span>
      </p>

      <p>Para arreglarlo puedes, por ejemplo, rellenar el último bloque:</p>

      <utf-sequence
        [show]="getSuggestedSequenceToFillUp()"
        [colors]="{ x: 'red' }"
      />
    </div>
  `,
})
export class DecodeNotByteSequenceErrorComponent {
  @Input({ required: true }) error!: NotByteSequenceError

  countBits() {
    return this.error.sequence.countBits()
  }

  getSuggestedSequenceToFillUp() {
    const uncompletedLastByte =
      this.error.sequence.getPotentiallyUncompletedLastByte()

    const missingBitsCountToCompleteByte =
      this.error.sequence.countBitsToReachByteGroupableSize()

    return (
      'x'.repeat(missingBitsCountToCompleteByte) + uncompletedLastByte.join('')
    )
  }
}
