import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-binary-input',
  templateUrl: './binary-input.component.html',
  styleUrls: ['./binary-input.component.scss'],
})
export class BinaryInputComponent implements OnInit {
  readonly BYTES_SEPARATOR = '   ';

  value: string = '';
  @Output() blur = new EventEmitter<string>();
  @Output() change = new EventEmitter<void>();

  constructor(public utilsService: UtilsService) {}

  ngOnInit(): void {}

  handleInteraction(entered: string) {
    // enter key
    if (entered === 'Enter') {
      this.format();
      return false;
    }

    const enteredSequenceIsValid = /^([0-1]{1,})$/.test(entered);

    if (enteredSequenceIsValid) {
      this.change.emit();
    }

    // if false the entered string is ignored
    return enteredSequenceIsValid;
  }

  format() {
    const valueWithoutSpaces = this.utilsService
      .cleanSpaces(this.value)
      .substr(0, 32);

    this.blur.emit(valueWithoutSpaces);

    // then format value
    this.value = this.utilsService
      .chunks(valueWithoutSpaces.split(''), 8)
      .map((arr) => arr.join(''))
      .join(this.BYTES_SEPARATOR);
  }
}
