import { Component, OnInit, Input } from '@angular/core';
import { Order, Item, OrderService } from '../order.service';


@Component({
  selector: 'pmo-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  @Input() orders: [];
  @Input() listTitle: string;
  @Input() status: string;
  @Input() statusTitle: string;
  @Input() action: string;
  @Input() actionTitle: string;
  @Input() emptyMessage: string;
  isPending: boolean = false;

  constructor(private orderService: OrderService) { }

  ngOnInit() {}

  markAs(order: Order, action: string) {
    this.isPending = true;
    this.orderService.updateOrder(order, action).subscribe(() => {
      this.isPending = false;
    });
  }
  
  delete(id:string) {
    this.isPending = true;
    this.orderService.deleteOrder(id).subscribe(() => {
      this.isPending = false;
    })
  }

  total(items: Item[]) {
    let total = 0.0;
      items.forEach((item: Item) => {
        total += item.price;
      });
    return Math.round(total * 100) / 100;
  }
}
