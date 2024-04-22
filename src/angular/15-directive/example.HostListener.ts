import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickTracker]'
})
export class ClickTrackerDirective {

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    console.info('Element clicked:', event);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    console.info('Mouse entered');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    console.info('Mouse left');
  }
}
