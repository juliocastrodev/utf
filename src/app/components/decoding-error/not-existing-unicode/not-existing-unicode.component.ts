import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-existing-unicode',
  template: `<div>Not existing</div>`,
})
export class NotExistingUnicodeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
