import { Component, Input } from '@angular/core';
import { Item } from '../order.component';

@Component({
  selector: 'pmo-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.css',
})
export class MenuItemsComponent {
  @Input() items: Item[] = [];
}
