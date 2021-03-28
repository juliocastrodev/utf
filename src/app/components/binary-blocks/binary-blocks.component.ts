import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-binary-blocks',
  templateUrl: './binary-blocks.component.html',
  styleUrls: ['./binary-blocks.component.scss'],
})
export class BinaryBlocksComponent implements OnInit {
  @Input() char: string;

  constructor() {}

  ngOnInit(): void {}

  binaryBlocks(): string[][] {
    let binaryStr = this.char.codePointAt(0).toString(2);

    while (binaryStr.length % 8 !== 0) {
      binaryStr = '0' + binaryStr;
    }

    const res = [],
      numOfBytes = binaryStr.length / 8;
    for (let i = 0; res.length < numOfBytes; i += 8) {
      res.push(binaryStr.substr(i, 8).split(''));
    }

    return res;
  }
}
