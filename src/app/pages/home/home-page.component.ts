import { Component } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { CreditsComponent } from '../../shared/components/credits/credits.component'

@Component({
  standalone: true,
  imports: [
    FullScreenComponent,
    ButtonComponent,
    CommonModule,
    RouterModule,
    CreditsComponent,
  ],
  template: `<utf-fullscreen>
    <h1 class="font-retro">UTF-8</h1>

    <div class="my-10 flex flex-col gap-5">
      <utf-button routerLink="/encode" [label]="'Codificacion' | uppercase" />
      <utf-button routerLink="/decode" [label]="'Decodificacion' | uppercase" />
    </div>

    <utf-credits class="mt-auto max-w-xl" />
  </utf-fullscreen>`,
})
export class HomePageComponent {}
