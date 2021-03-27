import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-single-char-input',
  template: `
    <input
      appLineInput
      type="text"
      [ngModel]="value"
      (input)="update($event.target.value)"
      [maxLength]="2 - value.length"
    />
  `,
  styles: [
    `
      input {
        width: 7vw;
      }
    `,
  ],
})
export class SingleCharInputComponent implements OnInit {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  update(value: string) {
    this.value = value;
    this.valueChange.emit(value);
  }
}
