import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatUnicode',
})
export class FormatUnicodePipe implements PipeTransform {
  transform(hexStr: string): string {
    if (!hexStr) return null;

    // complete 0's to the minimum length (which is four)
    while (hexStr.length < 4) {
      hexStr = '0' + hexStr;
    }

    return `U+${hexStr}`;
  }
}
