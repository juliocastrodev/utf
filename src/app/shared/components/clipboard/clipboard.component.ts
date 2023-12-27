import { Component, Input } from '@angular/core'
import { ButtonComponent } from '../button/button.component'

@Component({
  standalone: true,
  selector: 'utf-clipboard',
  imports: [ButtonComponent],
  template: `
    <utf-button (click)="handleClick()" [disabled]="clicked" variant="circle">
      @if (!clicked) {
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
      } @else {
        <span class="block w-6 h-6 leading-none">✔</span>
      }
    </utf-button>
  `,
})
export class ClipboardComponent {
  @Input() copy = ''

  clicked = false

  async handleClick() {
    this.clicked = true

    await this.copyToClipboard()

    setTimeout(() => (this.clicked = false), 300)
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
