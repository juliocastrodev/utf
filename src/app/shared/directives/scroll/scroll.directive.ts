import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'

@Directive({
  selector: '[utfScroll]',
  standalone: true,
})
export class ScrollDirective implements OnChanges {
  @Input({ alias: 'utfScroll' }) dependency?: { dependsOn: unknown }

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dependency']) {
      setTimeout(() => {
        this.elementRef?.nativeElement.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }
}
