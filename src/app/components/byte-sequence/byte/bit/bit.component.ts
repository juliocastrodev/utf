import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bit',
  template: `
    <div [ngStyle]="{ color: color }">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./bit.component.scss'],
})
export class BitComponent implements OnInit {
  @Input() color: string;
  constructor() {}

  ngOnInit(): void {}
}
