import { Injectable } from '@angular/core'
import { Utf8Text } from '../../../domain/Utf8Text'

// TODO: think about services. Maybe they are not needed...

@Injectable({ providedIn: 'root' })
export class EncodingService {
  encodeText(text: string) {
    return Utf8Text.encode(text)
  }
}
