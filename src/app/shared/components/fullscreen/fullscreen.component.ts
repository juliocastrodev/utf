import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'utf-fullscreen',
  template: ` <div class="min-h-screen p-8 flex flex-col items-center">
    <ng-content />
  </div>`,
})
export class FullScreenComponent {}
