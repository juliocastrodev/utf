import { Injectable } from '@angular/core';
import { BytesPipe } from 'src/app/pipes/bytes.pipe';
import { Utf8Service } from '../utf8/utf8.service';
import { UtilsService } from '../utils/utils.service';
import UTF8 from 'utf8';

export type ColorMode = 'Normal' | 'UTF8';
export type SequenceColors = {
  sequence: string[][];
  utf8: string[][];
};

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  readonly BASIC_COLORS = ['red', 'green', 'blue'];
  constructor(
    private utf8Service: Utf8Service,
    private utilsService: UtilsService,
    private bytesPipe: BytesPipe
  ) {}

  getColors(char: string): SequenceColors {
    if (this.utf8Service.isACII(char)) {
      return { sequence: null, utf8: null }; // no colors
    }

    const charBinary: string[][] = this.bytesPipe.transform(char);

    return {
      sequence: this.asignColorsToSimpleByteSequence(charBinary),
      utf8: this.asignColorsToUTF8Template(
        charBinary.length,
        UTF8.encode(char).length
      ),
    };
  }

  private asignColorsToSimpleByteSequence(sequence: string[][]): string[][] {
    const colors = sequence
      .reverse()
      .map((byte, index) =>
        byte.map(() => this.BASIC_COLORS[this.BASIC_COLORS.length - 1 - index])
      )
      .reverse();

    // remove colors to utf8 out of range bits of the first byte:
    // (positions where there is no "x")
    if (colors.length > 1) {
      const firstByte = colors[0];

      this.utf8Service
        .getTemplateFirstByte(sequence.length)
        .forEach((bit, index) => {
          if (bit !== 'x') {
            firstByte[index] = null;
          }
        });
    }

    return colors;
  }

  private asignColorsToUTF8Template(
    numOfColors: number,
    numOfBytes: number
  ): string[][] {
    let colorCount = numOfColors,
      colorIndex = this.BASIC_COLORS.length - 1,
      n = 8;

    return this.utilsService.chunks(
      this.utf8Service
        .getTemplateBytes(numOfBytes)
        .flat()
        .reverse()
        .map((bit) => {
          if (colorCount === 0 || bit !== 'x') {
            return null;
          }

          const color = this.BASIC_COLORS[colorIndex];
          if (--n === 0) {
            colorCount--;
            colorIndex--;
            n = 8;
          }

          return color;
        })
        .reverse(),
      8
    );
  }

  // getColors(sequence: string[][], mode: ColorMode): string[][] {
  //   switch (mode) {
  //     case 'Normal':
  //       return sequence.map((byte, index) =>
  //         byte.map(
  //           () => this.BASIC_COLORS[this.BASIC_COLORS.length - 1 - index]
  //         )
  //       );

  //     case 'UTF8':
  //       let n = 6,
  //         colorIndex = this.BASIC_COLORS.length - 1;

  //       return this.utilsService.chunks(
  //         this.utf8Service
  //           .getTemplateBytes(sequence.length)
  //           .flat()
  //           .reverse()
  //           .map((bit) => {
  //             if (bit !== 'x') {
  //               return null;
  //             }

  //             const color = this.BASIC_COLORS[colorIndex];
  //             if (--n === 0) {
  //               colorIndex--;
  //               n = 6;
  //             }

  //             return color;
  //           })
  //           .reverse(),
  //         8
  //       );

  //     default:
  //       return null;
  //   }
  // }
}
