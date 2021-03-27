import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-column',
  template: `
    <div
      [ngStyle]="{
        'align-items': centered ? 'center' : 'initial',
        gap: gap
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
export class ColumnComponent {
  @Input() centered: boolean = true;
  @Input() gap: string = '0';
}
