import { Pipe, PipeTransform } from '@angular/core';
import { BinaryService } from '../services/binary/binary.service';
import { Byte } from '../services/binary/binary.service.types';
import { Utf8Service } from '../services/utf8/utf8.service';

@Pipe({
  name: 'bytes',
})
export class BytesPipe implements PipeTransform {
  constructor(
    private utf8Service: Utf8Service,
    private binaryService: BinaryService
  ) {}

  transform(sequence: string): string[][] {
    return this.utf8Service
      .getValidUTF8Chars(sequence)
      .map(this.binaryService.toBytes)
      .flat();
  }
}
