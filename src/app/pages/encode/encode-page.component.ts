import { Component } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { RouterModule } from '@angular/router'
import { NavigateDirective } from '../../shared/directives/navigate.directive'
import { InputComponent } from '../../shared/components/input/input.component'

@Component({
  standalone: true,
  imports: [
    FullScreenComponent,
    ButtonComponent,
    RouterModule,
    NavigateDirective,
    InputComponent,
  ],
  template: `<utf-fullscreen>
    <h1 class="font-retro">Encode</h1>

    <h3 class="mt-20 text-secondary">Introduce algo</h3>
    <utf-input class="mt-2 mb-10 max-w-[5rem]" [maxLength]="1" />

    <div class="mt-auto flex gap-5">
      <utf-button utfNavigate="/">Back</utf-button>
      <utf-button>Encode</utf-button>
    </div>
  </utf-fullscreen>`,
})
export class EncodePageComponent {}
