import { Component, OnInit, Input } from '@angular/core';
import { Order, Item, OrderService } from '../order.service';


@Component({
  selector: 'pmo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  @Input() orders: Order[];
  @Input() listTitle: string;
  @Input() status: string;
  @Input() statusTitle: string;
  @Input() action: string;
  @Input() actionTitle: string;
  @Input() emptyMessage: string;

  constructor(private orderService: OrderService) { }

  ngOnInit() {}

  markAs(order: Order, action: string) {
    this.orderService.updateOrder(order, action).subscribe(() => {
    });
  }

  delete(id:string) {
    this.orderService.deleteOrder(id).subscribe(() => {
    })
  }

  total(items: Item[]) {
    let total = 0.0;
    for (const item of items) {
      total += item.price;
    }
    return Math.round(total * 100) / 100;
  }
}
