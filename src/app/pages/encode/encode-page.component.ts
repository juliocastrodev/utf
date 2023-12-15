import { Component } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { RouterModule } from '@angular/router'
import { NavigateDirective } from '../../shared/directives/navigate.directive'

@Component({
  standalone: true,
  imports: [
    FullScreenComponent,
    ButtonComponent,
    RouterModule,
    NavigateDirective,
  ],
  template: `<utf-fullscreen>
    <h1 class="font-retro">Encode</h1>

    <div class="mt-auto flex gap-5">
      <utf-button utfNavigate="/">Back</utf-button>
      <utf-button>Encode</utf-button>
    </div>
  </utf-fullscreen>`,
})
export class EncodePageComponent {}
