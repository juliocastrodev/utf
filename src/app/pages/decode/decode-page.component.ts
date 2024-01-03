import { Component, HostListener } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { BinaryTextAreaComponent } from '../../shared/components/binary-text-area/binary-text-area.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { NavigateDirective } from '../../shared/directives/navigate/navigate.directive'
import { BinarySequence } from '../../domain/BinarySequence'
import { DecodingService } from '../../shared/services/decoding/decoding.service'

@Component({
  standalone: true,
  imports: [
    FullScreenComponent,
    BinaryTextAreaComponent,
    ButtonComponent,
    NavigateDirective,
  ],
  template: `<utf-fullscreen>
    <h1 class="font-retro">Decode</h1>

    <div class="mt-20 max-w-3xl flex grow flex-col gap-12">
      <div class="flex flex-col gap-2 items-center">
        <h3 class="text-secondary">Introduce tus bits</h3>
        <utf-binary-text-area (onsubmit)="sequence = $event" />
      </div>

      <p>El resultado final es: {{ decodedText }}</p>

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

  constructor(private decodingService: DecodingService) {}

  @HostListener('keydown.enter')
  decode() {
    if (!this.sequence) return

    const { text } = this.decodingService.decode(this.sequence)
    this.decodedText = text
  }
}
