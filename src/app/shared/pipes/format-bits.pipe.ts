import { Pipe, PipeTransform } from '@angular/core'
import { Bit, groupInBytes } from '../../domain/Binary'

@Pipe({
  standalone: true,
  name: 'utfFormatBits',
})
export class FormatBitsPipe implements PipeTransform {
  transform(bits: Bit[]) {
    const bytes = groupInBytes(bits)

    return bytes.map((byte) => byte.join('')).join(' ')
  }
}
