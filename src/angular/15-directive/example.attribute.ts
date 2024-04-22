import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class AppColorDirective {
  @Input('appColor') set color(color: string) {
    this.el.nativeElement.style.color = color;
  }

  constructor(private el: ElementRef) {}
}