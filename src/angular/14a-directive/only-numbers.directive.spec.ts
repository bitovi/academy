import { OnlyNumbersDirective } from './only-numbers.directive';
import {DebugElement} from "@angular/core";

describe('OnlyNumbersDirective', () => {
  let debugElement: DebugElement;

  it('should create an instance', () => {
    const directive = new OnlyNumbersDirective(debugElement);
    expect(directive).toBeTruthy();
  });
});
