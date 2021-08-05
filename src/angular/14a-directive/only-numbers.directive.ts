import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[pmoOnlyNumbers]'
})
export class OnlyNumbersDirective {

  private allowedKeys: Array<string> = ['Backspace', 'ArrowLeft', 'ArrowRight'];
  private regExp: RegExp =  new RegExp(/^[0-9]*$/g);

  constructor(private elementRef: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(keyboardEvent: KeyboardEvent) {
    if(this.allowedKeys.indexOf(keyboardEvent.key) !== -1) return;
    const next: string = this.elementRef.nativeElement.value.concat(keyboardEvent.key);
    if(next && !next.match(this.regExp)) keyboardEvent.preventDefault();
  }

}
