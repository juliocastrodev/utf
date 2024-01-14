import { Component } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'

// TODO: everything
@Component({
  template: `<utf-fullscreen>
    <h1>Not Found</h1>
  </utf-fullscreen>`,
  standalone: true,
  imports: [FullScreenComponent],
})
export class NotFound404PageComponent {}
