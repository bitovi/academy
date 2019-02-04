import { Component, OnInit, Input } from '@angular/core';
import { Order, OrderService } from '../order.service';


@Component({
  selector: 'pmo-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class OrderListComponent implements OnInit {
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

  total(items: []) {
    return this.orderService.getTotal(items);
  }
}
