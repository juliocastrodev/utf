import { Directive, ElementRef, HostListener, OnInit } from '@angular/core'

@Directive({
  selector: '[utfAutoResize]',
  standalone: true,
})
export class AutoResizeDirective implements OnInit {
  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.resize()
  }

  @HostListener('input')
  onInput() {
    this.resize()
  }

  resize() {
    this.elementRef.nativeElement.style.height = '0'
    this.elementRef.nativeElement.style.height =
      this.elementRef.nativeElement?.scrollHeight + 'px'
  }
}
