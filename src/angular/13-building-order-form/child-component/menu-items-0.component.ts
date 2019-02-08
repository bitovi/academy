import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pmo-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.less']
})
export class MenuItemsComponent implements OnInit {
  @Input() items: [];
  
  constructor() { }

  ngOnInit() {
  }

}
