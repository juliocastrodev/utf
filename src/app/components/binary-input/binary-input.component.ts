import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-binary-input',
  templateUrl: './binary-input.component.html',
  styleUrls: ['./binary-input.component.scss'],
})
export class BinaryInputComponent implements OnInit {
  readonly BYTES_SEPARATOR = '   ';

  value: string = '';
  @Output() change = new EventEmitter<string>();

  constructor(public utilsService: UtilsService) {}

  ngOnInit(): void {}

  handleInteraction(entered: string) {
    // if false the entered string is ignored
    return /^([0-1]{1,})$/.test(entered);
  }

  format() {
    const valueWithoutSpaces = this.utilsService
      .cleanSpaces(this.value)
      .substr(0, 32);

    this.change.emit(valueWithoutSpaces);

    // then format value
    this.value = this.utilsService
      .chunks(valueWithoutSpaces.split(''), 8)
      .map((arr) => arr.join(''))
      .join(this.BYTES_SEPARATOR);
  }
}
