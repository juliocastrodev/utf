import { Injectable } from '@angular/core'
import { EncodedText } from '../../../domain/encoding/EncodedText'

// TODO: think about services. Maybe they are not needed...

@Injectable({ providedIn: 'root' })
export class EncodingService {
  encodeText(text: string) {
    return EncodedText.encode(text)
  }
}
