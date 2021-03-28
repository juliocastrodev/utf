import { Component, Input, OnInit } from '@angular/core';
import { Utf8Service } from 'src/app/services/utf8/utf8.service';
import UTF8 from 'utf8';

@Component({
  selector: 'app-encoding-wizard',
  templateUrl: './encoding-wizard.component.html',
  styleUrls: ['./encoding-wizard.component.scss'],
})
export class EncodingWizardComponent implements OnInit {
  @Input() char: string;
  encoded: string;

  constructor(public utf8Service: Utf8Service) {}

  ngOnInit(): void {
    this.encoded = UTF8.encode(this.char);
  }

  isACII(): boolean {
    return this.char.codePointAt(0) <= 127;
  }
}
