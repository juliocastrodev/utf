import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  computed,
  signal,
} from '@angular/core'
import { ExpandableListItemComponent } from './expandable-list-item.component'
import { ButtonComponent } from '../button/button.component'

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonComponent],
  selector: 'utf-expandable-list',
  template: ` <ul [ngClass]="classes">
    @for (item of displayedItems(); track $index) {
      <ng-container *ngTemplateOutlet="item.template" />
    }

    @if (canLoadMoreItems()) {
      <utf-button (click)="loadMoreItems()">...</utf-button>
    }
  </ul>`,
})
export class ExpandableListComponent {
  @Input() classes = ''

  @ContentChildren(ExpandableListItemComponent)
  items?: QueryList<ExpandableListItemComponent>

  displayedItemsCount = signal(5)

  displayedItems = computed(
    () =>
      this.items?.filter((_, idx) => idx < this.displayedItemsCount()) ?? [],
  )

  canLoadMoreItems = computed(() => {
    if (!this.items) return false
    return this.items.length > this.displayedItemsCount()
  })

  loadMoreItems() {
    this.displayedItemsCount.set(this.displayedItemsCount() + 5)
  }
}
