import { Component, HostListener } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { RouterModule } from '@angular/router'
import { NavigateDirective } from '../../shared/directives/navigate/navigate.directive'
import { InputComponent } from '../../shared/components/input/input.component'
import { SectionComponent } from '../../shared/components/section/section.component'
import { EncodingService } from '../../shared/services/encoding/encoding.service'
import { ResultComponent } from './components/result/result.component'
import { ExplanationComponent } from './components/explanation/explanation.component'
import { ScrollDirective } from '../../shared/directives/scroll/scroll.directive'
import { EncodedText } from '../../domain/encoding/EncodedText'
import { EncodedCodepoint } from '../../domain/encoding/EncodedCodepoint'

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
        <utf-input [disabled]="!!encodedText" [(value)]="textToEncode" />
      </div>

      @if (encodedText) {
        <utf-result
          [encodedText]="encodedText"
          (selectcodepoint)="selectedCodepoint = $event"
        />
      }
      @if (selectedCodepoint) {
        <utf-explanation
          [encodedCodepoint]="selectedCodepoint"
          [utfScroll]="{ dependsOn: selectedCodepoint }"
        />
      }

      <div class="mt-auto flex gap-5">
        <utf-button utfNavigate="/">Back</utf-button>

        @if (textToEncode && !encodedText) {
          <utf-button (click)="encode()">Encode</utf-button>
        }

        @if (encodedText) {
          <utf-button (click)="restart()">Restart</utf-button>
        }
      </div>
    </div>
  </utf-fullscreen>`,
})
export class EncodePageComponent {
  textToEncode = ''
  encodedText?: EncodedText
  selectedCodepoint?: EncodedCodepoint

  constructor(private encodingService: EncodingService) {}

  @HostListener('keydown.enter')
  encode() {
    if (!this.textToEncode || this.encodedText) return

    this.encodedText = this.encodingService.encodeText(this.textToEncode)
  }

  restart() {
    this.textToEncode = ''
    this.encodedText = undefined
    this.selectedCodepoint = undefined
  }
}
