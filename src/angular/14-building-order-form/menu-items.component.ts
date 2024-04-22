import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from '../order.component';

@Component({
  selector: 'pmo-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MenuItemsComponent),
      multi: true,
    },
  ],
})
export class MenuItemsComponent implements ControlValueAccessor {
  @Input() items: Item[] = [];
  @Input('value') _value: Item[] = [];

  onChange: any = () => {};
  onTouched: any = () => {};

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: Item[]) {
    this.value = value;
  }

  updateItem(item: Item): void {
    const index = this._value?.indexOf(item) ?? -1;
    if (index !== -1) {
      this._value?.splice(index, 1);
    } else {
      this._value?.push(item);
    }
    this.writeValue(this._value);
  }
}
