import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { UtilsService } from '../services/utils/utils.service';

@Directive({
  selector: '[appRetro]',
})
export class RetroDirective {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private utilsService: UtilsService
  ) {}

  readonly STYLES = {
    'font-family': 'var(--retro-font)',
    'font-size': '3rem',
    color: 'var(--dark-blue)',
    'letter-spacing': '0.4rem',
  };

  ngOnInit() {
    this.utilsService.applyStyles({
      renderer: this.renderer,
      elementRef: this.elementRef,
      styles: this.STYLES,
    });
  }
}
