import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-resizable-input',
  templateUrl: './resizable-input.component.html',
  styleUrls: ['./resizable-input.component.scss'],
})
export class ResizableInputComponent implements OnInit {
  @Input() value: number;
  @Output() valueChange = new EventEmitter<number>();

  readonly MIN_WIDTH = 3; // rem
  constructor() {}

  ngOnInit(): void {}

  update(value: string) {
    const numValue = value ? +value : null;
    this.value = numValue;
    this.valueChange.emit(numValue);
  }
}
