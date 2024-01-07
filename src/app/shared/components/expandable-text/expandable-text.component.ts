import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { ButtonComponent } from '../button/button.component'

// TODO: move all svgs to assets or somewhere more standard

@Component({
  standalone: true,
  selector: 'utf-expandable-text',
  imports: [CommonModule, ButtonComponent],
  template: ` <p [ngClass]="[classes]">
    {{ getTextToShow() }}

    @if (shouldShowExpandButton()) {
      <utf-button variant="plain" (click)="expand()">...</utf-button>
    } @else if (shouldShowShortenButton()) {
      <utf-button variant="circle" (click)="shrink()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style="fill: currentColor;transform:rotate(45deg);msFilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=1);"
        >
          <path d="M2 15h7v7h2v-9H2v2zM15 2h-2v9h9V9h-7V2z"></path>
        </svg>
      </utf-button>
    }
  </p>`,
})
export class ExpandableTextComponent {
  @Input() text = ''
  @Input() classes = ''

  private readonly MAX_INITIAL_CHARACTERS_COUNT = 64

  isExpanded = false

  getTextToShow() {
    return this.isExpanded
      ? this.text
      : this.text.slice(0, this.MAX_INITIAL_CHARACTERS_COUNT)
  }

  shouldShowExpandButton() {
    return (
      this.text.length > this.MAX_INITIAL_CHARACTERS_COUNT && !this.isExpanded
    )
  }

  shouldShowShortenButton() {
    return this.isExpanded
  }

  expand() {
    this.isExpanded = true
  }

  shrink() {
    this.isExpanded = false
  }
}
