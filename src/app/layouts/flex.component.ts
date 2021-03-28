import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flex',
  template: `
    <div
      [ngStyle]="{
        'align-items': centered ? 'center' : 'initial',
        gap: gap,
        'flex-direction': direction
      }"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      div {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class FlexComponent {
  @Input() centered: boolean = true;
  @Input() gap: string = '0';
  @Input() direction: 'column' | 'row' = 'row';
}
