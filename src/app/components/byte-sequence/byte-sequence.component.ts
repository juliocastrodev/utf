import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-byte-sequence',
  template: `
    <app-byte *ngFor="let byte of sequence" [byte]="byte"></app-byte>
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 1rem;
      }
    `,
  ],
})
export class ByteSequenceComponent implements OnInit {
  @Input() sequence: string[][];
  constructor() {}

  ngOnInit(): void {}
}
