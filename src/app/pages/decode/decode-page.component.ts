import { Component } from '@angular/core'
import { FullScreenComponent } from '../../shared/components/fullscreen/fullscreen.component'
import { BinaryInputComponent } from '../../shared/components/binary-input/binary-input.component'

@Component({
  standalone: true,
  imports: [FullScreenComponent, BinaryInputComponent],
  template: `<utf-fullscreen>
    <h1 class="font-retro">Decode</h1>

    <div class="mt-20 max-w-3xl flex grow flex-col gap-12">
      <div class="flex flex-col gap-2 items-center">
        <h3 class="text-secondary">Introduce tus bits</h3>
        <utf-binary-input />
      </div>
    </div>
  </utf-fullscreen>`,
})
export class DecodePageComponent {}
