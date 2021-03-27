import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRetro]',
})
export class RetroDirective {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  readonly RETRO_STYLES = {
    'font-family': 'var(--retro-font)',
    'font-size': '3rem',
    color: 'var(--dark-blue)',
    'letter-spacing': '0.4rem',
  };

  ngOnInit() {
    Object.entries(this.RETRO_STYLES).forEach(([styleName, styleValue]) => {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        styleName,
        styleValue
      );
    });
  }
}
