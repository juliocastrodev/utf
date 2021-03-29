import { Component, Input, OnInit } from '@angular/core';
import {
  ColorService,
  SequenceColors,
} from 'src/app/services/color/color.service';
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
  colors: SequenceColors;

  constructor(
    public utf8Service: Utf8Service,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.encoded = UTF8.encode(this.char);
    this.colors = this.colorService.getColors(this.char);
  }
}
