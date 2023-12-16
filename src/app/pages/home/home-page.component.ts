import { Component } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { CreditsComponent } from './components/credits/credits.component'
import { NavigateDirective } from '../../shared/directives/navigate.directive'

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

    <div class="my-10 flex flex-col gap-5">
      <utf-button utfNavigate="encode">Codificacion</utf-button>
      <utf-button utfNavigate="decode">Decodificacion</utf-button>
    </div>

    <utf-credits class="mt-auto max-w-xl" />
  </utf-fullscreen>`,
})
export class HomePageComponent {}
