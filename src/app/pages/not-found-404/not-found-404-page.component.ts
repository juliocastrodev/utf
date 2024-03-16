import { Component } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'

// TODO: everything
@Component({
  standalone: true,
  imports: [FullScreenComponent],
  template: `<utf-fullscreen>
    <h1>Not Found</h1>
  </utf-fullscreen>`,
})
export class NotFound404PageComponent {}
