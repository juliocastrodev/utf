import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BinaryInputComponent } from 'src/app/components/binary-input/binary-input.component';
import { Utf8Service } from 'src/app/services/utf8/utf8.service';

@Component({
  selector: 'app-decoding-page',
  templateUrl: './decoding-page.component.html',
  styleUrls: ['./decoding-page.component.scss'],
})
export class DecodingPageComponent implements OnInit {
  @ViewChild(BinaryInputComponent, { static: true })
  binaryInput: BinaryInputComponent;

  binarySequence: string;
  showDecoding: boolean;
  showDecodingButton: boolean = false;

  constructor(public utf8Service: Utf8Service) {}

  ngOnInit(): void {}

  reset() {
    this.showDecoding = false;
    this.showDecodingButton = false;
    this.binarySequence = '';
    this.binaryInput.value = '';
  }
}
