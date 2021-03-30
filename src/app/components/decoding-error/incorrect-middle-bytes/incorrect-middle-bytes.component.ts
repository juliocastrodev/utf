import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Utf8Service } from 'src/app/services/utf8/utf8.service';

@Component({
  selector: 'app-incorrect-middle-bytes',
  template: `
    <div>
      Cuando se tienen varios bytes, todos los que no son el primero han de
      comenzar con "10". Siguiendo la siguiente estructura:
    </div>
    <app-byte [byte]="utf8Service.getTemplateFollowingByte()"></app-byte>
    <div>En la secuencia que tenemos, ocurre lo siguiente:</div>
    <ng-container *ngFor="let displayElem of displaySequence">
      <div>El {{ displayElem.label }} byte está incorrecto:</div>
      <app-byte [byte]="displayElem.byte" [colors]="displayColors"></app-byte>
    </ng-container>
  `,
})
export class IncorrectMiddleBytesComponent implements OnChanges {
  @Input() sequence: string[][];
  displaySequence: { byte: string[]; label: string }[];
  displayColors = [...Array(2).fill('red'), ...Array(6).fill(null)];

  constructor(public utf8Service: Utf8Service) {}

  ngOnChanges(): void {
    this.displaySequence = this.getDisplaySequence();
  }

  getDisplaySequence() {
    const res = [];
    for (let i = 1; i < this.sequence.length; i++) {
      if (this.sequence[i][0] !== '1' || this.sequence[i][1] !== '0') {
        res.push({ byte: this.sequence[i], label: this.getLabel(i) });
      }
    }
    return res;
  }

  private getLabel(index: number) {
    switch (index) {
      case 1:
        return 'segundo';
      case 2:
        return 'tercer';
      case 3:
        return 'cuarto';
    }
    return null;
  }
}
