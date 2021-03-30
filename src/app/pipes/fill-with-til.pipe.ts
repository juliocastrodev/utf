import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fillWithTil',
})
export class FillWithTilPipe implements PipeTransform {
  transform(value: string, fillChar: string, tilLength: number) {
    if (!value) return null;

    let res = value;
    while (res.length < tilLength) {
      res = fillChar + res;
    }

    return res;
  }
}
