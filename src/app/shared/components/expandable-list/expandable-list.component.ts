import { CommonModule } from '@angular/common'
import { Component, ContentChildren, Input, QueryList } from '@angular/core'
import { ExpandableListItemComponent } from './expandable-list-item.component'
import { ButtonComponent } from '../button/button.component'

@Component({
  standalone: true,
  selector: 'utf-expandable-list',
  imports: [CommonModule, ButtonComponent],
  template: ` <ul [ngClass]="[classes]">
    @for (item of getItemsToDisplay(); track $index) {
      <ng-container *ngTemplateOutlet="item.template" />
    }

    @if (shouldShowLoadMoreButton()) {
      <utf-button (click)="loadMore()">...</utf-button>
    }
  </ul>`,
})
export class ExpandableListComponent {
  @Input() classes = ''

  @ContentChildren(ExpandableListItemComponent)
  items?: QueryList<ExpandableListItemComponent>

  itemsToShow = 5
  showLoadMoreButton = false

  getItemsToDisplay() {
    return this.items?.filter((_, idx) => idx < this.itemsToShow)
  }

  shouldShowLoadMoreButton() {
    if (!this.items) return false
    return this.itemsToShow < this.items.length
  }

  loadMore() {
    this.itemsToShow += 5
  }
}
