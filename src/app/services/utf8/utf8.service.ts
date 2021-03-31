import { Injectable } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import UTF8 from 'utf8';
import { Byte } from '../binary/binary.service.types';

export enum UTF8DecodingError {
  NotByteSequence = 'NotByteSequence',
  IncorrectASCII = 'IncorrectASCII',
  IncorrectFirstByte = 'IncorrectFirstByte',
  IncorrectMiddleBytes = 'IncorrectMiddleBytes',
  NotExistingUnicode = 'NotExistingUnicode',
}

@Injectable({
  providedIn: 'root',
})
export class Utf8Service {
  constructor(private utilsService: UtilsService) {}

  getTemplateBytes(numOfBytes: number): string[][] {
    return [
      this.getTemplateFirstByte(numOfBytes),
      ...new Array(numOfBytes - 1).fill(this.getTemplateFollowingByte()),
    ];
  }

  isACII(char: string): boolean {
    return char.codePointAt(0) <= 127;
  }

  private getBaseByte(): string[] {
    return new Array(8).fill('x');
  }

  // 2 -> ["1","1","0","x","x","x","x","x"]
  // 3 -> ["1","1","1","0","x","x","x","x"]
  // 4 -> ["1","1","1","1","0","x","x","x"]
  getTemplateFirstByte(numOfBytes: number): string[] {
    const base = this.getBaseByte();
    for (let i = 0; i < numOfBytes; i++) {
      base[i] = '1';
    }
    base[numOfBytes] = '0';
    return base;
  }

  // always ["1","0","x","x","x","x","x","x"]
  public getTemplateFollowingByte(): string[] {
    const base = this.getBaseByte();
    base[0] = '1';
    base[1] = '0';
    return base;
  }

  // return the number of "x"'s given an amount of bytes
  getTemplateAvailableBits(numOfBytes): number {
    const numOfBitsFromFirstByte = 8 - (numOfBytes + 1);
    const numOfBitsFromFollowingBytes = 6 * (numOfBytes - 1);

    return numOfBitsFromFirstByte + numOfBitsFromFollowingBytes;
  }

  getDecodingError(binarySequence: string): UTF8DecodingError {
    if (!binarySequence) {
      return null;
    }

    if (binarySequence.length % 8 !== 0) {
      return UTF8DecodingError.NotByteSequence;
    }

    const bytes = this.utilsService.chunks(binarySequence.split(''), 8);
    const firstByte = bytes[0];

    if (bytes.length === 1) {
      return firstByte[0] === '0' ? null : UTF8DecodingError.IncorrectASCII;
    }

    const firstByteStartBits = this.getFirstNBits(firstByte, bytes.length + 1),
      firstByteTemplateStartBits = this.getFirstNBits(
        this.getTemplateFirstByte(bytes.length),
        bytes.length + 1
      );
    if (
      !this.utilsService.equalsArrays(
        firstByteStartBits,
        firstByteTemplateStartBits
      )
    ) {
      return UTF8DecodingError.IncorrectFirstByte;
    }

    const restOfBytes = bytes.splice(1);
    if (restOfBytes.some((byte) => byte[0] !== '1' || byte[1] !== '0')) {
      return UTF8DecodingError.IncorrectMiddleBytes;
    }

    try {
      this.decodeBinarySequence(binarySequence);
    } catch (err) {
      return UTF8DecodingError.NotExistingUnicode;
    }

    return null; // no error
  }

  private getFirstNBits(byte: string[], nBits: number) {
    return byte.slice(0, nBits);
  }

  decodeBinarySequence(binarySequence: string): string {
    const bytesInStringChunks: string[] = this.utilsService
      .chunks(binarySequence.split(''), 8)
      .map((byte) => byte.join('')); // xxxxxxxx xxxxxxxx ... xxxxxxxx

    const encodedSequence: string = bytesInStringChunks
      .map((byte) => String.fromCodePoint(parseInt(byte, 2)))
      .join('');

    return UTF8.decode(encodedSequence);
  }

  getValidUTF8Chars(sequence: string): string[] {
    const res = [];

    let n;
    for (let index = 0; index < sequence.length; index += n) {
      n = 1;

      let char;
      while (!this.isValidUTF8((char = sequence.substr(index, n)))) n++;

      res.push(char);
    }

    return res;
  }

  isValidUTF8(char: string): boolean {
    try {
      return char === UTF8.decode(UTF8.encode(char));
    } catch {
      return false;
    }
  }

  hexFromBinarySequence(sequence: string[][]): string {
    return sequence
      .map((byte) => byte.join(''))
      .map((byteStr) => parseInt(byteStr, 2).toString(16))
      .join('')
      .toUpperCase();
  }

  getInfoFromEncodedUT8BinarySequence(sequence: Byte[]): Byte[] {
    const reverseFlatSequence = sequence.flat().reverse();
    let info = [];
    this.getTemplateBytes(sequence.length)
      .flat()
      .reverse()
      .forEach((bit, index) => {
        if (bit === 'x') {
          info = [reverseFlatSequence[index], ...info];
        }
      });

    while (info.length % 8 !== 0) {
      info = ['0', ...info];
    }
    return this.utilsService.chunks(info, 8) as any;
  }
}
