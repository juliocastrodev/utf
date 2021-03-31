import { Injectable } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { Byte } from './binary.service.types';

@Injectable({ providedIn: 'root' })
export class BinaryService {
  constructor() {}

  toBinarySequence(char: string) {}

  toBytes(char: string): Byte[] {
    let charInBinaryStr = char.codePointAt(0).toString(2);

    while (charInBinaryStr.length % 8 !== 0) {
      charInBinaryStr = '0' + charInBinaryStr;
    }

    const res: Byte[] = [],
      numOfBytes = charInBinaryStr.length / 8;
    for (let i = 0; res.length < numOfBytes; i += 8) {
      res.push(charInBinaryStr.substr(i, 8).split('') as any);
    }

    return res;
  }
}
