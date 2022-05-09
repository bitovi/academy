import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Item, Order, OrderService } from '../order.service';

@Component({
  selector: 'pmo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() orders?: Order[];
  @Input() listTitle?: string;
  @Input() status?: string;
  @Input() statusTitle?: string;
  @Input() action?: string;
  @Input() actionTitle?: string;
  @Input() emptyMessage?: string;
  private onDestroy$ = new Subject<void>();

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  markAs(order: Order, action: string): void {
    this.orderService
      .updateOrder(order, action)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  delete(id: string): void {
    this.orderService
      .deleteOrder(id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  total(items: Item[]): number {
    let total = 0.0;
    for (const item of items) {
      total += item.price;
    }
    return Math.round(total * 100) / 100;
  }
}
