import { Component } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'

@Component({
  standalone: true,
  template: `<utf-fullscreen>
    <h1>Home</h1>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolor
      quaerat qui debitis quod nihil earum, voluptatem sint totam, inventore
      dignissimos iure, optio perferendis quo porro facilis sequi aliquid!
      Asperiores?
    </p>
  </utf-fullscreen>`,
  imports: [FullScreenComponent],
})
export class HomePageComponent {}
