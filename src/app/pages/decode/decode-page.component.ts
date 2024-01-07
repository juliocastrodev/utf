import { Component, HostListener } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { BinaryInputComponent } from '../../shared/components/binary-input/binary-input.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { NavigateDirective } from '../../shared/directives/navigate/navigate.directive'
import { BinarySequence } from '../../domain/BinarySequence'
import {
  DecodeError,
  DecodingService,
} from '../../shared/services/decoding/decoding.service'
import { DecodeErrorComponent } from './components/error/decode-error.component'
import { DecodeResultComponent } from './components/result/decode-result.component'
import { NotByteSequenceError } from '../../domain/error/NotByteSequenceError'
import { InvalidInitialUtf8ByteError } from '../../domain/error/InvalidInitialUtf8ByteError'
import { MismatchUtf8TemplateError } from '../../domain/error/MismatchUtf8TemplateError'

@Component({
  standalone: true,
  imports: [
    FullScreenComponent,
    BinaryInputComponent,
    ButtonComponent,
    NavigateDirective,
    DecodeErrorComponent,
    DecodeResultComponent,
  ],
  template: `<utf-fullscreen>
    <h1 class="font-retro">Decode</h1>

    <div class="mt-20 max-w-3xl flex grow flex-col items-center gap-12">
      <div class="flex flex-col items-center gap-2 ">
        <h3 class="text-secondary">Introduce tus bits</h3>
        <utf-binary-input
          [(sequence)]="sequence"
          [(valid)]="isValidSequence"
          [colored]="coloredSequence"
          (onblur)="decode()"
        />
      </div>

      @if (decodedText) {
        <utf-decode-result [text]="decodedText" />
      }
      @if (error) {
        <utf-decode-error [error]="error" />
      }

      <div class="mt-auto flex flex-col sm:flex-row gap-5">
        <utf-button utfNavigate="/">Back</utf-button>

        @if (canDecode()) {
          <utf-button (click)="decode()">Decode</utf-button>
        }

        @if (hasDecoded()) {
          <utf-button (click)="restart()">Restart</utf-button>
        }
      </div>
    </div>
  </utf-fullscreen>`,
})
export class DecodePageComponent {
  sequence = BinarySequence.empty()
  isValidSequence?: boolean

  decodedText?: string
  error?: DecodeError

  constructor(private decodingService: DecodingService) {}

  canDecode() {
    return !this.sequence.isEmpty() && this.isValidSequence
  }

  hasDecoded() {
    return Boolean(this.decodedText || this.error)
  }

  @HostListener('keydown.enter')
  decode() {
    if (!this.canDecode()) return

    const { text, error } = this.decodingService.decode(this.sequence)
    this.decodedText = text
    this.error = error
    this.updateColoredSequence()
  }

  restart() {
    this.sequence = BinarySequence.empty()
    this.decodedText = undefined
    this.error = undefined
  }

  // TODO: I don't like to have this here...
  coloredSequence: BinaryInputComponent['colored']
  updateColoredSequence() {
    if (!this.error) {
      this.coloredSequence = undefined
    }

    if (this.error instanceof NotByteSequenceError) {
      const uncompletedByte =
        this.error.sequence.getPotentiallyUncompletedLastByte()

      this.coloredSequence = {
        fromBitAt: this.error.sequence.countBits() - uncompletedByte.length,
        toBitAt: this.error.sequence.countBits() - 1,
      }
      return
    }

    if (this.error instanceof InvalidInitialUtf8ByteError) {
      // TODO: maybe this can be simplified by adding more metadata to errors
      const invalidByte = new BinarySequence(this.error.byte)
      const invalidByteIdx =
        8 *
        this.sequence
          .groupInBytes()
          .map((byte) => new BinarySequence(byte))
          .findIndex((seq) => seq.equals(invalidByte))

      this.coloredSequence = {
        fromBitAt: invalidByteIdx,
        toBitAt: invalidByteIdx + 7,
      }
      return
    }

    if (this.error instanceof MismatchUtf8TemplateError) {
      const invalidSequence = this.error.params.sequence

      this.coloredSequence = {
        fromBitAt: this.sequence.indexOf(invalidSequence),
        toBitAt: this.sequence.endIndexOf(invalidSequence),
      }
      return
    }

    this.coloredSequence = undefined
  }
}
