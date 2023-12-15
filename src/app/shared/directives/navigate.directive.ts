import { Directive, HostListener, Input } from '@angular/core'
import { Router } from '@angular/router'

@Directive({
  selector: '[utfNavigate]',
  standalone: true,
})
export class NavigateDirective {
  @Input({ required: true, alias: 'utfNavigate' }) route = ''

  constructor(private router: Router) {}

  @HostListener('click')
  onClick() {
    if (!this.route) return

    this.router.navigateByUrl(this.route)
  }
}
