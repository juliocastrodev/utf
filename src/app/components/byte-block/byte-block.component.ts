import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-byte-block',
  templateUrl: './byte-block.component.html',
  styleUrls: ['./byte-block.component.scss'],
})
export class ByteBlockComponent implements OnInit {
  @Input() byte: string[];

  constructor() {}

  ngOnInit(): void {}
}
