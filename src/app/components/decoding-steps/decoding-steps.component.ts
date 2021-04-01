import { Component, Input, OnChanges } from '@angular/core';
import { BinaryService } from 'src/app/services/binary/binary.service';
import { Byte } from 'src/app/services/binary/binary.service.types';
import { ColorService } from 'src/app/services/color/color.service';
import { Utf8Service } from 'src/app/services/utf8/utf8.service';

@Component({
  selector: 'app-decoding-steps',
  templateUrl: './decoding-steps.component.html',
  styleUrls: ['./decoding-steps.component.scss'],
})
export class DecodingStepsComponent implements OnChanges {
  @Input() binarySequence: string;
  @Input() decodedChar: string;
  binarySequenceBytes: Byte[];
  sequenceInfo: Byte[];

  math = Math;

  constructor(
    public utf8Service: Utf8Service,
    public binaryService: BinaryService,
    public colorService: ColorService
  ) {}

  ngOnChanges(): void {
    this.binarySequenceBytes = this.binaryService.fromBinarySequenceToBytes(
      this.binarySequence
    );
    this.sequenceInfo = this.binaryService.removeStartingEmptyBytes(
      this.utf8Service.getInfoFromEncodedUT8BinarySequence(
        this.binarySequenceBytes
      )
    );
  }
}
