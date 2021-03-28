import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '../services/utils/utils.service';

@Pipe({
  name: 'bytes',
})
export class BytesPipe implements PipeTransform {
  constructor(private utilsService: UtilsService) {}

  transform(sequence: string): string[][] {
    return this.utilsService
      .getValidUTF8Chars(sequence)
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
