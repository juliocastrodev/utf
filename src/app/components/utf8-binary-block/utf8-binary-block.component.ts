import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-utf8-binary-block',
  templateUrl: './utf8-binary-block.component.html',
  styleUrls: ['./utf8-binary-block.component.scss'],
})
export class Utf8BinaryBlockComponent implements OnInit {
  @Input() numOfBytes: number; // >=2

  constructor() {}

  ngOnInit(): void {}

  getBytes(): string[][] {
    return [
      this.getFirstByte(),
      ...new Array(this.numOfBytes - 1).fill(this.getFollowingByte()),
    ];
  }

  private getBaseByte(): string[] {
    return new Array(8).fill('x');
  }

  // 2 -> ["1","1","0","x","x","x","x","x"]
  // 3 -> ["1","1","1","0","x","x","x","x"]
  // 3 -> ["1","1","1","1","0","x","x","x"]
  private getFirstByte(): string[] {
    const base = this.getBaseByte();
    for (let i = 0; i < this.numOfBytes; i++) {
      base[i] = '1';
    }
    base[this.numOfBytes] = '0';
    return base;
  }

  // always ["1","0","x","x","x","x","x","x"]
  private getFollowingByte(): string[] {
    const base = this.getBaseByte();
    base[0] = '1';
    base[1] = '0';
    return base;
  }
}
