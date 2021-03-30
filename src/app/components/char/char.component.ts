import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-char',
  template: `{{ char }}`,
  styleUrls: ['./char.component.scss'],
})
export class CharComponent implements OnInit {
  @Input() char: string;
  constructor() {}

  ngOnInit(): void {}
}
