import { Injectable } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { Byte } from './binary.service.types';

@Injectable({ providedIn: 'root' })
export class BinaryService {
  constructor(private utilsService: UtilsService) {}

  fromBinarySequenceToBytes(sequence: string): Byte[] {
    return this.utilsService.chunks(sequence.split(''), 8) as any;
  }

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

  removeStartingEmptyBytes(bytes: Byte[]): Byte[] {
    // single byte case (0 value)
    if (bytes.length === 1) return bytes;

    let resIndex = 0;
    while (bytes[resIndex].every((bit) => bit === '0')) resIndex++;
    return bytes.slice(resIndex);
  }

  value(bytes: Byte[]) {}
}
