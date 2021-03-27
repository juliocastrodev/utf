import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unicode',
})
export class UnicodePipe implements PipeTransform {
  transform(char: string): string {
    return char && char.codePointAt(0).toString(16).toUpperCase();
  }
}
