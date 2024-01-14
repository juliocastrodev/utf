import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core'

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
