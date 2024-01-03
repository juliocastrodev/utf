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

    <div class="mt-20 max-w-3xl flex grow flex-col gap-12">
      <div class="flex flex-col gap-2 items-center">
        <h3 class="text-secondary">Introduce tus bits</h3>
        <utf-binary-text-area (onsubmit)="sequence = $event; decode()" />
      </div>

      @if (decodedText) {
        <utf-decode-result />
      }
      @if (error) {
        <utf-decode-error [error]="error" />
      }

      <div class="mt-auto flex justify-center gap-5">
        <utf-button utfNavigate="/">Back</utf-button>
        <utf-button (click)="decode()">Decode</utf-button>
      </div>
    </div>
  </utf-fullscreen>`,
})
export class DecodePageComponent {
  sequence?: BinarySequence
  decodedText?: string
  error?: DecodeError

  constructor(private decodingService: DecodingService) {}

  @HostListener('keydown.enter')
  decode() {
    if (!this.sequence) return

    const { text, error } = this.decodingService.decode(this.sequence)
    this.decodedText = text
    this.error = error
  }
}
