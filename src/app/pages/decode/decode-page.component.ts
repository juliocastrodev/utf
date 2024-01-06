import { Component, HostListener } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { BinaryTextAreaComponent } from '../../shared/components/binary-text-area/binary-text-area.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { NavigateDirective } from '../../shared/directives/navigate/navigate.directive'
import { BinarySequence } from '../../domain/BinarySequence'
import {
  DecodeError,
  DecodingService,
} from '../../shared/services/decoding/decoding.service'
import { DecodeErrorComponent } from './components/error/decode-error.component'
import { DecodeResultComponent } from './components/result/decode-result.component'

@Component({
  standalone: true,
  imports: [
    FullScreenComponent,
    BinaryTextAreaComponent,
    ButtonComponent,
    NavigateDirective,
    DecodeErrorComponent,
    DecodeResultComponent,
  ],
  template: `<utf-fullscreen>
    <h1 class="font-retro">Decode</h1>

    <div class="mt-20 max-w-3xl flex grow flex-col items-center gap-12">
      <div class="flex flex-col gap-2 ">
        <h3 class="text-secondary">Introduce tus bits</h3>
        <utf-binary-text-area [(sequence)]="sequence" />
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

        @if (decodedText || error) {
          <utf-button (click)="restart()">Restart</utf-button>
        }
      </div>
    </div>
  </utf-fullscreen>`,
})
export class DecodePageComponent {
  sequence = BinarySequence.empty()
  decodedText?: string
  error?: DecodeError

  constructor(private decodingService: DecodingService) {}

  canDecode() {
    return !this.sequence.isEmpty()
  }

  @HostListener('keydown.enter')
  decode() {
    if (!this.canDecode()) return

    const { text, error } = this.decodingService.decode(this.sequence)
    this.decodedText = text
    this.error = error
  }

  restart() {
    this.sequence = BinarySequence.empty()
    this.decodedText = undefined
    this.error = undefined
  }
}
