import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../order.component';

@Component({
  selector: 'pmo-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.less'],
})
export class MenuItemsComponent implements OnInit {
  @Input() items: Item[] = [];

  constructor() {}

  ngOnInit(): void {}
}
