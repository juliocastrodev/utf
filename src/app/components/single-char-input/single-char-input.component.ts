import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import UTF8 from 'utf8';

@Component({
  selector: 'app-single-char-input',
  template: `
    <input
      appLineInput
      type="text"
      [(ngModel)]="value"
      (input)="update(getSingleCharUTF8($event.target.value))"
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

  update(char: string) {
    setTimeout(() => {
      this.value = char;
      this.valueChange.emit(char);
    }, 0);
  }

  getSingleCharUTF8(value: string) {
    if (!value) return null;

    let char = value[0];
    for (let n = 2; n <= value.length && !this.isValidUTF8(char); n++) {
      char = value.substr(0, n);
    }

    return char;
  }

  private isValidUTF8(char: string): boolean {
    try {
      return char === UTF8.decode(UTF8.encode(char));
    } catch {
      return false;
    }
  }
}
