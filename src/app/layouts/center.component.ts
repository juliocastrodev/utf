import { Component } from '@angular/core';

@Component({
  selector: 'app-center',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4rem;
        padding: 2rem;
        min-height: 90vh;
      }
    `,
  ],
})
export class CenterComponent {}
