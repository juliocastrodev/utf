import { Injectable } from '@angular/core'
import { EncodedText } from '../../../domain/encoding/EncodedText'

@Injectable({ providedIn: 'root' })
export class EncodingService {
  encodeText(text: string) {
    return EncodedText.encode(text)
  }
}
