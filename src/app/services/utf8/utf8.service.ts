import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Utf8Service {
  constructor() {}

  getTemplateBytes(numOfBytes: number): string[][] {
    return [
      this.getFirstByte(numOfBytes),
      ...new Array(numOfBytes - 1).fill(this.getFollowingByte()),
    ];
  }

  private getBaseByte(): string[] {
    return new Array(8).fill('x');
  }

  // 2 -> ["1","1","0","x","x","x","x","x"]
  // 3 -> ["1","1","1","0","x","x","x","x"]
  // 3 -> ["1","1","1","1","0","x","x","x"]
  private getFirstByte(numOfBytes: number): string[] {
    const base = this.getBaseByte();
    for (let i = 0; i < numOfBytes; i++) {
      base[i] = '1';
    }
    base[numOfBytes] = '0';
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
