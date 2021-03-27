import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {
  @Input() value: string;

  constructor() {}

  ngOnInit(): void {}

  getChars(): string[] {
    return this.value.split('');
  }
}
