import { Injectable } from '@angular/core';
import { ApplyStylesParams } from './utils.service.types';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  constructor() {}

  // min and max are inclusive
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

  // String.fromCodePoint uses UTF-16 Big Indian encoding.
  // The number 591 corresponds to the last character of the
  // B extended latin plane
  readonly MAX_UNICODE = 591;
  randomChar(): string {
    return String.fromCodePoint(this.randomInt(0, this.MAX_UNICODE));
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
}
