import { Component, OnInit } from '@angular/core';
import {
  UTF8DecodingError,
  Utf8Service,
} from 'src/app/services/utf8/utf8.service';

@Component({
  selector: 'app-decoding-page',
  templateUrl: './decoding-page.component.html',
  styleUrls: ['./decoding-page.component.scss'],
})
export class DecodingPageComponent implements OnInit {
  byteSequence: string;
  decodingError: UTF8DecodingError | string;

  constructor(public utf8Service: Utf8Service) {}

  ngOnInit(): void {}

  handleInput(byteSequence: string) {
    this.byteSequence = byteSequence;
    this.decodingError = this.utf8Service.getDecodingError(byteSequence);

    console.log(this.decodingError);
  }
}
