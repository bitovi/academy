import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../order.component';

@Component({
  selector: 'pmo-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.less',
})
export class MenuItemsComponent {
  @Input() items: Item[] = [];
  @Output() itemChanged: EventEmitter<Item> = new EventEmitter();

  updateItem(item: Item): void {
    this.itemChanged.emit(item);
  }
}
