import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Item {
  name: string;
  price: number;
}

@Component({
  selector: 'pmo-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.less'],
})
export class MenuItemsComponent implements OnInit {
  @Input() items?: Item[];
  @Output() itemsChanged: EventEmitter<Item[]> = new EventEmitter();
  selectedItems: Item[] = [];

  constructor() {}

  ngOnInit(): void {}

  updateItems(item: Item): void {
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(item);
    }
    this.itemsChanged.emit(this.selectedItems);
  }
}
