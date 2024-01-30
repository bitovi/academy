import { Component, Input } from '@angular/core';
import { Item } from '../order.component';

@Component({
  selector: 'pmo-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.less',
})
export class MenuItemsComponent {
  @Input() items: Item[] = [];
  selectedItems: Item[] = [];

  updateItems(item: Item): void {
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(item);
    }
  }
}
