import { Component, Input, OnInit } from '@angular/core';
import { ColorMode, ColorService } from 'src/app/services/color/color.service';

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
  @Input() colorMode: ColorMode;

  colors: string[][];

  constructor(public colorService: ColorService) {}

  ngOnInit(): void {
    this.colors = this.colorService.getColors(this.sequence, this.colorMode);
  }
}
