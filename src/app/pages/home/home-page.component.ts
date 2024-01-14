import { Component } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { CreditsComponent } from './components/credits/credits.component'
import { NavigateDirective } from '../../shared/directives/navigate/navigate.directive'

@Component({
  standalone: true,
  imports: [
    FullScreenComponent,
    ButtonComponent,
    NavigateDirective,
    CreditsComponent,
  ],
  template: `<utf-fullscreen>
    <h1 class="font-retro">UTF-8</h1>

    <div class="mt-20 grow flex flex-col gap-5 max-w-xl">
      <utf-button utfNavigate="encode">Codificacion</utf-button>
      <utf-button utfNavigate="decode">Decodificacion</utf-button>

      <utf-credits class="mt-auto" />
    </div>
  </utf-fullscreen>`,
})
export class HomePageComponent {}
