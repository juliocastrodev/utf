import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substringFromOccurrence',
})
export class SubstringFromOccurrencePipe implements PipeTransform {
  // we jump the occurrence
  transform(str: string, subSeq: string): string {
    return str.substr(str.indexOf(subSeq) + 1);
  }
}
