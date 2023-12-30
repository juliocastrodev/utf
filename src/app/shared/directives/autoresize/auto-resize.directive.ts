import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'

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

  resize() {
    this.elementRef.nativeElement.style.height = '0'
    this.elementRef.nativeElement.style.height =
      this.elementRef.nativeElement?.scrollHeight + 'px'
  }
}
