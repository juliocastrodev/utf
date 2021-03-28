import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import UTF8 from 'utf8';

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

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {}

  update(char: string) {
    setTimeout(() => {
      this.value = char;
      this.valueChange.emit(char);
    }, 0);
  }

  getSingleCharUTF8(value: string) {
    return value ? this.utilsService.getValidUTF8Chars(value)[0] : null;
  }
}
