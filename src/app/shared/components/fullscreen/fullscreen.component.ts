import { Component } from '@angular/core'

@Component({
  standalone: true,
  selector: 'utf-fullscreen',
  template: ` <div class="flex flex-col min-h-screen items-center gap-7 p-8">
    <ng-content />
  </div>`,
})
export class FullScreenComponent {}
