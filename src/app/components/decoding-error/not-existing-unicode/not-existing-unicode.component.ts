import { Component, Input, OnInit } from '@angular/core';
import { Utf8Service } from 'src/app/services/utf8/utf8.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-not-existing-unicode',
  template: `<div>
    No se ha podido decodificar la secuencia. Probablemente no hay ningún
    carácter Unicode asociado al hexadecimal 0x{{
      utf8Service.hexFromBinarySequence(getSequenceInfo())
    }}
  </div>`,
})
export class NotExistingUnicodeComponent implements OnInit {
  @Input() sequence: string[][];

  constructor(
    public utf8Service: Utf8Service,
    public utilsService: UtilsService
  ) {}

  ngOnInit(): void {}

  getSequenceInfo(): string[][] {
    const reverseFlatSequence = this.sequence.flat().reverse();
    let info = [];
    this.utf8Service
      .getTemplateBytes(this.sequence.length)
      .flat()
      .reverse()
      .forEach((bit, index) => {
        if (bit === 'x') {
          info = [reverseFlatSequence[index], ...info];
        }
      });

    while (info.length % 8 !== 0) {
      info = ['0', ...info];
    }

    return this.utilsService.chunks(info, 8);
  }
}
