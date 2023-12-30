import { Component, TemplateRef, ViewChild } from '@angular/core'

@Component({
  standalone: true,
  selector: 'utf-expandable-list-item',
  template: `
    <ng-template #itemTemplate>
      <li>
        <ng-content />
      </li>
    </ng-template>
  `,
})
export class ExpandableListItemComponent {
  @ViewChild('itemTemplate')
  template!: TemplateRef<unknown>
}
