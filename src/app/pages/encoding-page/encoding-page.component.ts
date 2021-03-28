import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-encoding-page',
  templateUrl: './encoding-page.component.html',
  styleUrls: ['./encoding-page.component.scss'],
})
export class EncodingPageComponent implements OnInit {
  char: string = this.utilsService.randomChar();
  showEncoding: boolean = true; // TODO: change to false

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {}
}
