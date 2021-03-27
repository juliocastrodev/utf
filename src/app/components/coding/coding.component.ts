import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.scss'],
})
export class CodingComponent implements OnInit {
  num: number = this.utilsService.randomInt(1, 20);

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {}
}
