import { Injectable } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import UTF8 from 'utf8';

export enum UTF8DecodingError {
  NotByteSequence,
  IncorrectASCII,
  IncorrectFirstByte,
  IncorrectMiddleBytes,
  NotExistingUnicode,
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
  private getTemplateFollowingByte(): string[] {
    const base = this.getBaseByte();
    base[0] = '1';
    base[1] = '0';
    return base;
  }

  getDecodingError(binarySequence: string): UTF8DecodingError | string {
    if (!binarySequence) {
      return null;
    }

    if (binarySequence.length % 8 !== 0) {
      return UTF8DecodingError.NotByteSequence;
    }

    const bytes = this.utilsService.chunks(binarySequence.split(''), 8);
    const firstByte = bytes[0];

    if (bytes.length === 1) {
      return firstByte[0] === '0'
        ? this.decodeBinarySequence(binarySequence)
        : UTF8DecodingError.IncorrectASCII;
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
      return this.decodeBinarySequence(binarySequence);
    } catch (err) {
      return UTF8DecodingError.NotExistingUnicode;
    }
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
}
