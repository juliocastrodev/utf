import { Injectable } from '@angular/core';
import { ApplyStylesParams } from './utils.service.types';
import UTF8 from 'utf8';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  //The maximum is inclusive and the minimum is inclusive
  randomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  applyStyles({ renderer, elementRef, styles }: ApplyStylesParams) {
    Object.entries(styles).forEach(([styleName, styleValue]) => {
      renderer.setStyle(elementRef.nativeElement, styleName, styleValue);
    });
  }

  readonly POSSIBLE_CHARS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  randomChar() {
    return this.POSSIBLE_CHARS[
      this.randomInt(0, this.POSSIBLE_CHARS.length - 1)
    ];
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

  chunks(arr: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }

  cleanSpaces(str: string): string {
    return str.replace(/\s/g, '');
  }

  equalsArrays(arr1: any[], arr2: any[]): boolean {
    return (
      arr1.length === arr2.length &&
      arr1.every((elem, index) => elem === arr2[index])
    );
  }

  hexFromBinarySequence(sequence: string[][]): string {
    return sequence
      .map((byte) => byte.join(''))
      .map((byteStr) => parseInt(byteStr, 2).toString(16))
      .join('')
      .toUpperCase();
  }
}
