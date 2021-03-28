import { Injectable } from '@angular/core';
import { Utf8Service } from '../utf8/utf8.service';
import { UtilsService } from '../utils/utils.service';

export type ColorMode = 'Normal' | 'UTF8';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  readonly BASIC_COLORS = ['red', 'green', 'blue'];
  constructor(
    private utf8Service: Utf8Service,
    private utilsService: UtilsService
  ) {}

  getColors(sequence: string[][], mode: ColorMode): string[][] {
    switch (mode) {
      case 'Normal':
        return sequence.map((byte, index) =>
          byte.map(() => this.BASIC_COLORS[index])
        );

      case 'UTF8':
        let n = 8,
          colorIndex = this.BASIC_COLORS.length - 1;

        return this.utilsService.chunks(
          this.utf8Service
            .getTemplateBytes(sequence.length)
            .flat()
            .reverse()
            .map((bit) => {
              if (bit !== 'x') {
                return null;
              }

              const color = this.BASIC_COLORS[colorIndex];
              if (--n === 0) {
                colorIndex--;
                n = 8;
              }

              return color;
            })
            .reverse(),
          8
        );

      default:
        return null;
    }
  }
}
