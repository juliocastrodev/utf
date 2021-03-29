import { Component, Input, OnChanges } from '@angular/core';
import {
  UTF8DecodingError,
  Utf8Service,
} from 'src/app/services/utf8/utf8.service';

@Component({
  selector: 'app-decoding-wizard',
  templateUrl: './decoding-wizard.component.html',
  styleUrls: ['./decoding-wizard.component.scss'],
})
export class DecodingWizardComponent implements OnChanges {
  @Input() binarySequence: string;

  decodingError: UTF8DecodingError;
  decodedChar: string;

  constructor(public utf8Service: Utf8Service) {}

  ngOnChanges(): void {
    if (!this.binarySequence) return;

    this.decodingError = this.utf8Service.getDecodingError(this.binarySequence);
    if (!this.decodingError) {
      this.decodedChar = this.utf8Service.decodeBinarySequence(
        this.binarySequence
      );
    }
  }
}
