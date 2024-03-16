import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core'
import clsx from 'clsx'

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'utf-section',
  template: `
    <section [class]="allClasses()">
      <ng-content />
    </section>
  `,
})
export class SectionComponent {
  classes = input('')

  allClasses = computed(() =>
    clsx('p-4 border-4 border-dotted border-primary', this.classes()),
  )
}
