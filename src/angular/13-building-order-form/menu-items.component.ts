import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item }  from '../order.service';

@Component({
  selector: 'pmo-menu-items',
  templateUrl: './menu-items.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MenuItemsComponent),
      multi: true
    }
  ]
})
export class MenuItemsComponent implements ControlValueAccessor {
  @Input() data: [];

  @Input('value') _value: Item[];

  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  registerOnChange( fn : any ) : void {
    this.onChange = fn;
  }

  registerOnTouched( fn : any ) : void {
    this.onTouched = fn;
  }

  writeValue(value:any) {
    this.value = value;
  }

  toggleItem(item: Item) {
    let index = this._value.indexOf(item);
    if(index !== -1) {
      this._value.splice(index, 1)
    }
    else {
      this._value.push(item);
    }
    this.writeValue(this._value);
  }

}