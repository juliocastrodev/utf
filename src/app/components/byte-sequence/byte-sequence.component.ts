import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-byte-sequence',
  template: `
    <app-byte
      *ngFor="let byte of sequence; index as i"
      [byte]="byte"
      [colors]="colors && colors[i]"
    ></app-byte>
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
  @Input() colors: string[][];

  constructor() {}

  ngOnInit(): void {}
}
