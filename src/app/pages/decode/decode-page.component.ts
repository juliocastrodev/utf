import { Component } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'

@Component({
  template: `<utf-fullscreen>
    <h1 class="font-retro">Decode</h1>
  </utf-fullscreen>`,
  standalone: true,
  imports: [FullScreenComponent],
})
export class DecodePageComponent {}
