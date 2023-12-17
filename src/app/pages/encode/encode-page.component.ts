import { Component } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { RouterModule } from '@angular/router'
import { NavigateDirective } from '../../shared/directives/navigate.directive'
import { InputComponent } from '../../shared/components/input/input.component'
import { SectionComponent } from '../../shared/components/section/section.component'
import {
  EncodingResult,
  EncodingService,
} from '../../shared/services/encoding/encoding.service'

@Component({
  standalone: true,
  imports: [
    FullScreenComponent,
    ButtonComponent,
    RouterModule,
    NavigateDirective,
    InputComponent,
    SectionComponent,
  ],
  template: ` <utf-fullscreen>
    <h1 class="font-retro">Encode</h1>

    <div class="mt-20 grow flex flex-col gap-12">
      <div class="flex flex-col gap-2 items-center">
        <h3 class="text-secondary">Introduce algo</h3>
        <utf-input [disabled]="isEncoded()" [(value)]="textToEncode" />
      </div>

      @if (isEncoded()) {
        @for (codepoint of encodingResult?.codepoints; track $index) {
          <utf-section>
            <h3>{{ codepoint.original.getOriginalText() }}</h3>
            <h3>{{ codepoint.encoded }}</h3>
          </utf-section>
        }
        <utf-section>
          <h3>Final result: {{ encodingResult?.encodedText }}</h3>
        </utf-section>
      }

      <div class="mt-auto flex gap-5">
        <utf-button utfNavigate="/">Back</utf-button>

        @if (textToEncode && !isEncoded()) {
          <utf-button (click)="encode()">Encode</utf-button>
        }

        @if (isEncoded()) {
          <utf-button (click)="reestart()">Restart</utf-button>
        }
      </div>
    </div>
  </utf-fullscreen>`,
})
export class EncodePageComponent {
  textToEncode = ''
  encodingResult?: EncodingResult

  constructor(private encodingService: EncodingService) {}

  isEncoded() {
    return Boolean(this.encodingResult)
  }

  encode() {
    this.encodingResult = this.encodingService.encodeText(this.textToEncode)
  }

  reestart() {
    this.textToEncode = ''
    this.encodingResult = undefined
  }
}
