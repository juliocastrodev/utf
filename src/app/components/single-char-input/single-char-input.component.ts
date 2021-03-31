import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Utf8Service } from 'src/app/services/utf8/utf8.service';

@Component({
  selector: 'app-single-char-input',
  template: `
    <input
      appLineInput
      type="text"
      [(ngModel)]="value"
      (input)="update(getSingleCharUTF8($event.target.value))"
      [disabled]="disabled"
      [ngStyle]="{ opacity: disabled ? 0.7 : null }"
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
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  constructor(private utf8Service: Utf8Service) {}

  ngOnInit(): void {}

  update(char: string) {
    setTimeout(() => {
      this.value = char;
      this.valueChange.emit(char);
    }, 0);
  }

  getSingleCharUTF8(value: string) {
    return value ? this.utf8Service.getValidUTF8Chars(value)[0] : null;
  }
}
