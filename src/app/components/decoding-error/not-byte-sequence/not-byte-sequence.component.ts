import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-byte-sequence',
  template: `
    <app-flex direction="column" gap="1rem">
      <div>Por favor introduce una secuencia de bytes (bloques de 8 bits)</div>
      <app-byte-sequence
        [sequence]="displaySequence"
        [colors]="displayColors"
      ></app-byte-sequence>
      <div>
        Falta rellenar las posiciones marcadas con x's ({{ numOfMissingBits }}
        en total)
      </div>
    </app-flex>
  `,
})
export class NotByteSequenceComponent implements OnChanges {
  @Input() sequence: string[][];
  displaySequence: string[][];
  displayColors: string[][];
  numOfMissingBits: number;
  constructor() {}

  ngOnChanges(): void {
    if (!this.sequence) return;

    this.numOfMissingBits = 8 - this.sequence[this.sequence.length - 1].length;
    this.displaySequence = this.sequence.map((byte) => [
      ...Array(8 - byte.length).fill('x'),
      ...byte,
    ]);
    this.displayColors = this.displaySequence.map((byte) =>
      byte.map((bit) => (bit === 'x' ? 'red' : null))
    );
  }
}
