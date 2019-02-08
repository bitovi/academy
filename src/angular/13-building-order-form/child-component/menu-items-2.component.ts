import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface Item {
  name: string;
  price: number
}

@Component({
  selector: 'pmo-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.less']
})
export class MenuItemsComponent implements OnInit {
  @Input() items: [];
  selectedItems: Item[] = [];
  @Output() itemsChanged: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeFunc(item: Item) {
    let index = this.selectedItems.indexOf(item);
    if(index > -1) {
      this.selectedItems.splice(index, 1);
    }
    else {
      this.selectedItems.push(item);
    }
    this.itemsChanged.emit(this.selectedItems);
  }

}
