import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'

// TODO: try to migrate to new input signals. And also
// see if it's possible to move the logic to the new
// 'host' field for angular directives

@Directive({
  selector: '[utfAutoResize]',
  standalone: true,
})
export class AutoResizeDirective implements OnChanges {
  @Input({ alias: 'utfAutoResize', required: true }) dependency?: {
    dependsOn: unknown
  }

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dependency']) {
      setTimeout(() => this.resize())
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.resize()
  }

  resize() {
    this.elementRef.nativeElement.style.height = '0'
    this.elementRef.nativeElement.style.height =
      this.elementRef.nativeElement?.scrollHeight + 'px'
  }
}
