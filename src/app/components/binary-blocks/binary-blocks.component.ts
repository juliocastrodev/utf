import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-binary-blocks',
  templateUrl: './binary-blocks.component.html',
  styleUrls: ['./binary-blocks.component.scss'],
})
export class BinaryBlocksComponent implements OnInit {
  @Input() sequence: string;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {}

  getBytes(): string[][] {
    return this.utilsService
      .getValidUTF8Chars(this.sequence)
      .map(this.getBytesFromChar)
      .flat();
  }

  private getBytesFromChar(char: string): string[][] {
    let charInBinaryStr = char.codePointAt(0).toString(2);

    while (charInBinaryStr.length % 8 !== 0) {
      charInBinaryStr = '0' + charInBinaryStr;
    }

    const res = [],
      numOfBytes = charInBinaryStr.length / 8;
    for (let i = 0; res.length < numOfBytes; i += 8) {
      res.push(charInBinaryStr.substr(i, 8).split(''));
    }

    return res;
  }
}
