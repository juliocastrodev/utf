import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retro-title',
  template: ` <h1><ng-content></ng-content></h1> `,
  styles: [
    `
      h1 {
        font-family: var(--retro-font);
        font-size: 3rem;
        color: var(--dark-blue);
        letter-spacing: 0.4rem;
      }
    `,
  ],
})
export class RetroTitleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
