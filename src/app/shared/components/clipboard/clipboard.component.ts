import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core'
import { ButtonComponent } from '../button/button.component'

// TODO: move all svgs to assets

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'utf-clipboard',
  imports: [ButtonComponent],
  template: `
    <utf-button
      (click)="handleClick()"
      [disabled]="mode() !== 'initial'"
      variant="circle"
    >
      @switch (mode()) {
        @case ('initial') {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="fill: currentColor;transform: ;msFilter:;"
          >
            <path
              d="M19 3h-2.25a1 1 0 0 0-1-1h-7.5a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 17H5V5h2v2h10V5h2v15z"
            ></path>
          </svg>
        }

        @case ('loading') {
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <style>
              .spinner_aj0A {
                fill: currentColor;
                transform-origin: center;
                animation: spinner_KYSC 0.75s infinite linear;
              }
              @keyframes spinner_KYSC {
                100% {
                  transform: rotate(360deg);
                }
              }
            </style>
            <path
              d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
              class="spinner_aj0A"
            />
          </svg>
        }

        @case ('done') {
          <span class="block w-6 h-6 leading-none">✔</span>
        }
      }
    </utf-button>
  `,
})
export class ClipboardComponent {
  @Input() copy = ''

  mode = signal<'initial' | 'loading' | 'done'>('initial')

  async handleClick() {
    this.mode.set('loading')
    await this.copyToClipboard()
    setTimeout(() => this.mode.set('done'), 300)
    setTimeout(() => this.mode.set('initial'), 600)
  }

  private async copyToClipboard() {
    if (!this.copy) return

    try {
      await navigator.clipboard.writeText(this.copy)
    } catch {
      this.copyToClipboardUsingOldWay()
    }
  }

  private copyToClipboardUsingOldWay() {
    const element = document.createElement('textarea')
    element.value = this.copy
    document.body.appendChild(element)
    element.select()
    document.execCommand('copy')
    document.body.removeChild(element)
  }
}
