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

    const charBinary = this.bytesPipe.transform(char);
    const sequenceColors = this.asignColorsToSimpleByteSequence(charBinary);
    const encodedSequenceLength = UTF8.encode(char).length;

    const numOfBitsToRemoveColor =
      sequenceColors.length * 8 -
      this.utf8Service.getTemplateAvailableBits(encodedSequenceLength);

    this.removeColorsFromByte(sequenceColors[0], 0, numOfBitsToRemoveColor);

    return {
      sequence: sequenceColors,
      utf8: this.asignColorsToUTF8Template(
        sequenceColors.length,
        encodedSequenceLength
      ),
    };
  }

  private asignColorsToSimpleByteSequence(sequence: string[][]): string[][] {
    return sequence
      .reverse()
      .map((byte, index) =>
        byte.map(() => this.BASIC_COLORS[this.BASIC_COLORS.length - 1 - index])
      )
      .reverse();
  }

  private removeColorsFromByte(
    byteColors: string[],
    startIndex: number,
    numOfBits: number
  ) {
    let index = startIndex,
      bitsCount = numOfBits;

    while (bitsCount > 0) {
      byteColors[index] = null;

      index++;
      bitsCount--;
    }
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
}
