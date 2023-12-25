import { Component, HostListener } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { RouterModule } from '@angular/router'
import { NavigateDirective } from '../../shared/directives/navigate/navigate.directive'
import { InputComponent } from '../../shared/components/input/input.component'
import { SectionComponent } from '../../shared/components/section/section.component'
import {
  EncodingResult,
  EncodingService,
} from '../../shared/services/encoding/encoding.service'
import { ResultComponent } from './components/result/result.component'
import { ExplanationComponent } from './components/explanation/explanation.component'
import { Codepoint } from '../../domain/Codepoint'
import { ScrollDirective } from '../../shared/directives/scroll/scroll.directive'

@Component({
  standalone: true,
  imports: [
    FullScreenComponent,
    ButtonComponent,
    RouterModule,
    NavigateDirective,
    InputComponent,
    SectionComponent,
    ResultComponent,
    ExplanationComponent,
    ScrollDirective,
  ],
  template: ` <utf-fullscreen>
    <h1 class="font-retro">Encode</h1>

    <div class="mt-20 max-w-3xl grow flex flex-col gap-12">
      <div class="flex flex-col gap-2 items-center">
        <h3 class="text-secondary">Introduce algo</h3>
        <utf-input [disabled]="isEncoded()" [(value)]="textToEncode" />
      </div>

      @if (isEncoded()) {
        <utf-result
          [encoding]="encodingResult!"
          (selectcodepoint)="explainCodepoint = $event"
        />
      }
      @if (explainCodepoint) {
        <utf-explanation
          [codepoint]="explainCodepoint"
          [utfScroll]="explainCodepoint"
        />
      }

      <div class="mt-auto flex gap-5">
        <utf-button utfNavigate="/">Back</utf-button>

        @if (textToEncode && !isEncoded()) {
          <utf-button (click)="encode()">Encode</utf-button>
        }

        @if (isEncoded()) {
          <utf-button (click)="restart()">Restart</utf-button>
        }
      </div>
    </div>
  </utf-fullscreen>`,
})
export class EncodePageComponent {
  textToEncode = ''
  encodingResult?: EncodingResult
  explainCodepoint?: Codepoint

  constructor(private encodingService: EncodingService) {}

  isEncoded() {
    return Boolean(this.encodingResult)
  }

  @HostListener('keydown.enter')
  encode() {
    if (!this.textToEncode || this.isEncoded()) return

    this.encodingResult = this.encodingService.encodeText(this.textToEncode)
  }

  restart() {
    this.textToEncode = ''
    this.encodingResult = undefined
    this.explainCodepoint = undefined
  }
}
