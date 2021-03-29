import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-char',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./char.component.scss'],
})
export class CharComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
