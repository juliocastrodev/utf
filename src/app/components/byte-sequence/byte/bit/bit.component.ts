import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bit',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./bit.component.scss'],
})
export class BitComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
