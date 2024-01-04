import { Component, Input } from '@angular/core'
import { SectionComponent } from '../../../../shared/components/section/section.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { DecodeError } from '../../../../shared/services/decoding/decoding.service'
import { NotByteSequenceError } from '../../../../domain/error/NotByteSequenceError'
import { InvalidInitialUtf8ByteError } from '../../../../domain/error/InvalidInitialUtf8ByteError'
import { DecodeNotByteSequenceErrorComponent } from './components/decode-not-byte-sequence-error.component'
import { DecodeInvalidInitialByteErrorComponent } from './components/decode-invalid-initial-byte-error.component'

@Component({
  selector: 'utf-decode-error',
  standalone: true,
  imports: [
    SectionComponent,
    ButtonComponent,
    DecodeNotByteSequenceErrorComponent,
    DecodeInvalidInitialByteErrorComponent,
  ],
  template: `
    <utf-section classes="flex flex-col gap-4">
      <h3>Error de decodificación</h3>

      @if (isNotByteSequenceError(this.error)) {
        <utf-decode-not-byte-sequence-error [error]="error" />
      } @else if (isInvalidInitialByteError(this.error)) {
        <utf-decode-invalid-initial-byte-error [error]="error" />
      } @else {
        <p>Ha ocurrido un error de decodificación desconocido</p>
      }
    </utf-section>
  `,
})
export class DecodeErrorComponent {
  @Input({ required: true }) error!: DecodeError

  // TODO: remove
  ngOnInit() {
    console.log({ error: this.error })
  }

  isNotByteSequenceError(e: Error): e is NotByteSequenceError {
    return e instanceof NotByteSequenceError
  }

  isInvalidInitialByteError(e: Error): e is InvalidInitialUtf8ByteError {
    return e instanceof InvalidInitialUtf8ByteError
  }
}
