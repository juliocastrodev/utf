import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { UtilsService } from '../services/utils/utils.service';

@Directive({
  selector: '[appLineInput]',
})
export class LineInputDirective {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private utilsService: UtilsService
  ) {}

  readonly STYLES = {
    'text-align': 'center',
    border: 'none',
    'border-bottom': 'solid 0.2rem var(--dark-blue)',
    'background-color': 'transparent',
    color: 'var(--dark-blue)',
    'font-size': '3rem',
    'font-family': 'var(--simple-font)',
  };

  ngOnInit() {
    this.utilsService.applyStyles({
      renderer: this.renderer,
      elementRef: this.elementRef,
      styles: this.STYLES,
    });
  }
}
