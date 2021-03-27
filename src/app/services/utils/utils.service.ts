import { Injectable } from '@angular/core';
import { ApplyStylesParams } from './utils.service.types';

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
}
