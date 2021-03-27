import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-unicode-reference-button',
  template: `
    <app-button (click)="openUnicodeReference()">{{
      char | unicode | formatUnicode
    }}</app-button>
  `,
  styles: [
    `
      app-button {
        font-size: 10rem;
      }
    `,
  ],
})
export class UnicodeReferenceButtonComponent implements OnInit {
  @Input() char: string;

  constructor() {}

  ngOnInit(): void {}

  openUnicodeReference() {
    window.open(
      `https://unicode-table.com/${this.char.codePointAt(0).toString(16)}`
    );
  }
}
