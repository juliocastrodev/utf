import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-resizable-input',
  template: `
    <input
      appLineInput
      type="text"
      [ngModel]="value"
      (input)="update($event.target.value)"
      [style.width]="(value ? value.toString().length : 1) * MIN_WIDTH + 'rem'"
    />
  `,
})
export class ResizableInputComponent implements OnInit {
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();

  readonly MIN_WIDTH = 2; // rem
  constructor() {}

  ngOnInit(): void {}

  update(value: string) {
    this.value = value;
    this.valueChange.emit(value);
  }
}
