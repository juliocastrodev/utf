import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-incorrect-ascii',
  template: `
    <app-flex direction="column" gap="1rem">
      <div>
        Si la secuencia de bits se compone de un único byte, en UTF-8 éste ha de
        corresponder con un carácter retrocompatible con ASCII, es decir, se ha
        de codificar con 7 bits. Esto implica que el bit superior ha de estar a
        0
      </div>
      <app-byte-sequence
        [sequence]="sequence"
        [colors]="colors"
      ></app-byte-sequence>
    </app-flex>
  `,
})
export class IncorrectAsciiComponent implements OnInit {
  @Input() sequence: string[][];
  colors: string[][];
  constructor() {}

  ngOnInit(): void {
    this.colors = [['red', ...new Array(7).fill(null)]];
  }
}
