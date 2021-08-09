import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[pmoOnlyNumbers]'
})
export class OnlyNumbersDirective {

  private allowedKeys: string[] = ['Backspace', 'ArrowLeft', 'ArrowRight'];
  private regExp: RegExp =  new RegExp(/^[0-9]*$/g);

  constructor(private elementRef: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(keyboardEvent: KeyboardEvent) {
    if(this.allowedKeys.indexOf(keyboardEvent.key) !== -1) {
      return;
    }
    const inputNativeElementValue = this.elementRef.nativeElement.value;
    const next = `${inputNativeElementValue}${keyboardEvent.key}`;
    if(next && !next.match(this.regExp)) {
      keyboardEvent.preventDefault();
    }
  }

}
