import { Component, Input, OnInit } from '@angular/core';
import { UTF8DecodingError } from 'src/app/services/utf8/utf8.service';

@Component({
  selector: 'app-decoding-error',
  templateUrl: './decoding-error.component.html',
  styleUrls: ['./decoding-error.component.scss'],
})
export class DecodingErrorComponent implements OnInit {
  @Input() error: UTF8DecodingError;

  constructor() {}

  ngOnInit(): void {}
}
