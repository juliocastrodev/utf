import { Component } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
  standalone: true,
  template: `<utf-fullscreen>
    <h1 class="font-retro">UTF-8</h1>

    <div class="mt-10 flex flex-col gap-5">
      <utf-button routerLink="/encode" [label]="'Codificacion' | uppercase" />
      <utf-button routerLink="/decode" [label]="'Decodificacion' | uppercase" />
    </div>

    <p class="mt-10">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolor
      quaerat qui debitis quod nihil earum, voluptatem sint totam, inventore
      dignissimos iure, optio perferendis quo porro facilis sequi aliquid!
      Asperiores?
    </p>
  </utf-fullscreen>`,
  imports: [FullScreenComponent, ButtonComponent, CommonModule, RouterModule],
})
export class HomePageComponent {}
