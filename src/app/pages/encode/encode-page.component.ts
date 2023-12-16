import { Component } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { RouterModule } from '@angular/router'
import { NavigateDirective } from '../../shared/directives/navigate.directive'
import { InputComponent } from '../../shared/components/input/input.component'
import { SectionComponent } from '../../shared/components/section/section.component'

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
        <utf-input
          class="max-w-[5rem]"
          [(value)]="textToEncode"
          [maxLength]="1"
        />
      </div>

      @if (encodedText) {
        <utf-section class="max-w-4xl [&_*]:text-secondary">
          <h2>Bueno esto</h2>

          <h3>The encoded text is [{{ encodedText }}]</h3>

          <p>
            llorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem llorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem llorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem orem lorem lorem lorem lorem
            lorem orem lorem lorem lorem lorem lorem orem lorem lorem
          </p>
        </utf-section>
      }

      <div class="mt-auto flex gap-5">
        <utf-button utfNavigate="/">Back</utf-button>

        @if (textToEncode && !encodedText) {
          <utf-button (click)="encode()">Encode</utf-button>
        }

        @if (encodedText) {
          <utf-button (click)="reestart()">Restart</utf-button>
        }
      </div>
    </div>
  </utf-fullscreen>`,
})
export class EncodePageComponent {
  textToEncode = ''
  encodedText = ''

  encode() {
    this.encodedText = 'awita'
  }

  reestart() {
    this.textToEncode = ''
    this.encodedText = ''
  }
}
