import { Component, Input, OnInit } from '@angular/core';
import { Utf8Service } from 'src/app/services/utf8/utf8.service';

@Component({
  selector: 'app-incorrect-first-byte',
  template: `
    <app-flex direction="column" gap="1rem">
      <div>
        Ya que la secuencia tiene {{ sequence.length }}
        bytes. Es necesario que el primero tenga la siguiente estructura:
      </div>
      <app-byte-sequence
        [sequence]="displayTemplate"
        [colors]="displayColors"
      ></app-byte-sequence>
      <div>
        Ahora mismo se tiene "{{ getTemplateStartBits(sequence) }}" y debería
        ser "{{ getTemplateStartBits(displayTemplate) }}"
      </div>
    </app-flex>
  `,
})
export class IncorrectFirstByteComponent implements OnInit {
  @Input() sequence: string[][];
  displayTemplate: string[][];
  displayColors: string[][];

  numOfTemplateStartBits: number;

  constructor(private utf8Service: Utf8Service) {}

  ngOnInit(): void {
    this.displayTemplate = [
      this.utf8Service.getTemplateFirstByte(this.sequence.length),
    ];

    const numOfBytes = this.sequence.length;
    this.numOfTemplateStartBits = numOfBytes + 1; // 1 => 10, 2 => 110, 3 => 1110, 4 => 11110
    const numOfAvailableBitsOfFirstByte = 8 - this.numOfTemplateStartBits;

    this.displayColors = [
      [
        ...Array(this.numOfTemplateStartBits).fill('red'),
        ...Array(numOfAvailableBitsOfFirstByte).fill(null),
      ],
    ];
  }

  getTemplateStartBits(sequence: string[][]): string {
    return sequence[0].slice(0, this.numOfTemplateStartBits).join('');
  }
}
