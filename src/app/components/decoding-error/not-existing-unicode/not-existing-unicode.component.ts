import { Component, Input, OnInit } from '@angular/core';
import { Byte } from 'src/app/services/binary/binary.service.types';
import { Utf8Service } from 'src/app/services/utf8/utf8.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-not-existing-unicode',
  template: `<div>
    No se ha podido decodificar la secuencia. Probablemente no hay ningún
    carácter Unicode asociado al hexadecimal 0x{{ sequenceHex }}, es decir, con
    código U+{{ sequenceHex }}
  </div>`,
})
export class NotExistingUnicodeComponent implements OnInit {
  @Input() sequence: Byte[];
  sequenceHex: string;

  constructor(
    public utf8Service: Utf8Service,
    public utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.sequenceHex = this.utf8Service.hexFromBinarySequence(
      this.utf8Service.getInfoFromEncodedUT8BinarySequence(this.sequence)
    );
  }
}
