import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-byte',
  template: `
    <app-bit *ngFor="let bit of byte; index as i" [color]="colors && colors[i]">
      {{ bit }}
    </app-bit>
  `,
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
})
export class ByteComponent implements OnInit {
  @Input() byte: string[];
  @Input() colors: string[];
  constructor() {}

  ngOnInit(): void {}
}
