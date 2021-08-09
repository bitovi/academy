import { OnlyNumbersDirective } from './only-numbers.directive';
import {Component, DebugElement} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

@Component({
  template: `<input name="phone" type="text" pmoOnlyNumbers />`
})
class TestInputComponent {}

describe('OnlyNumbersDirective', () => {
  let debugElement: DebugElement;
  let fixture: ComponentFixture<TestInputComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [OnlyNumbersDirective, TestInputComponent],
      imports: [FormsModule],
      providers: []
    }).createComponent(TestInputComponent);
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('input'));
  });

  it('should create an instance', () => {
    const directive = new OnlyNumbersDirective(debugElement);
    expect(directive).toBeTruthy();
  });

  it('should contain only text 329053', () => {
    const inputString = '32T90V53CFACR';
    simulateTyping(inputString);
    expect(debugElement.nativeElement.value).toEqual('329053');
  });

  it('should contain only text 200', () => {
    const inputString = 'THisIsA200LETTERWORD';
    simulateTyping(inputString);
    expect(debugElement.nativeElement.value).toEqual('200');
  });

  it('should be an empty string', () => {
    const inputString = 'STRING OF LETTER NO NUMBER';
    simulateTyping(inputString);
    expect(debugElement.nativeElement.value).toBe('');
  });

  function simulateTyping(value: string) {
    let buildString: string = '';
    for (let singleValue of value) {
      const keydownEvent = new KeyboardEvent('keydown', { key: singleValue, cancelable: true })
      debugElement.nativeElement.dispatchEvent(keydownEvent);
      if (keydownEvent.defaultPrevented) {
      } else {
        buildString = buildString.concat(singleValue);
      }
    }
    debugElement.nativeElement.value = buildString;
    debugElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }
});
