import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  standalone: true,
  selector: 'utf-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent {}
