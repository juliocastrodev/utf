import { Component, HostListener } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { RouterModule } from '@angular/router'
import { NavigateDirective } from '../../shared/directives/navigate/navigate.directive'
import { InputComponent } from '../../shared/components/input/input.component'
import { SectionComponent } from '../../shared/components/section/section.component'
import { EncodingService } from '../../shared/services/encoding/encoding.service'
import { EncodeResultComponent } from './components/result/encode-result.component'
import { EncodeExplanationComponent } from './components/explanation/encode-explanation.component'
import { ScrollDirective } from '../../shared/directives/scroll/scroll.directive'
import { Utf8Text } from '../../domain/Utf8Text'
import { Utf8Codepoint } from '../../domain/Utf8Codepoint'

@Component({
  standalone: true,
  imports: [
    FullScreenComponent,
    ButtonComponent,
    RouterModule,
    NavigateDirective,
    InputComponent,
    SectionComponent,
    EncodeResultComponent,
    EncodeExplanationComponent,
    ScrollDirective,
  ],
  template: ` <utf-fullscreen>
    <h1 class="font-retro">Encode</h1>

    <div class="mt-20 max-w-3xl flex grow flex-col gap-12">
      <div class="flex flex-col gap-2 items-center">
        <h3 class="text-secondary">Introduce algo</h3>
        <!-- TODO: remove this dummy [colored] -->
        <utf-input
          [colored]="{ fromIdx: 2, toIdx: 5, color: 'red' }"
          [disabled]="!!encodedText"
          [(value)]="textToEncode"
        />
      </div>

      @if (encodedText) {
        <utf-encode-result
          [encodedText]="encodedText"
          (selectcodepoint)="selectedCodepoint = $event"
        />
      }
      @if (selectedCodepoint) {
        <utf-encode-explanation
          [encodedCodepoint]="selectedCodepoint"
          [utfScroll]="{ dependsOn: selectedCodepoint }"
        />
      }

      <div class="mt-auto flex justify-center gap-5">
        <utf-button utfNavigate="/">Back</utf-button>

        @if (canEncode()) {
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
  encodedText?: Utf8Text
  selectedCodepoint?: Utf8Codepoint

  constructor(private encodingService: EncodingService) {}

  canEncode() {
    return this.textToEncode && !this.encodedText
  }

  @HostListener('keydown.enter')
  encode() {
    if (!this.canEncode()) return

    this.encodedText = this.encodingService.encodeText(this.textToEncode)
  }

  restart() {
    this.textToEncode = ''
    this.encodedText = undefined
    this.selectedCodepoint = undefined
  }
}
