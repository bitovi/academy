import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, AbstractControl, Validators } from '@angular/forms';

import { RestaurantService } from '../restaurant/restaurant.service';
import { Restaurant } from '../restaurant/restaurant';
import { OrderService, Order, Item } from './order.service';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import {ItemTotalPipe} from "../item-total.pipe";


function minLengthArray(min: number) {
  return (c: AbstractControl): {[key: string]: any} => {
      if (c.value.length >= min)
          return null;
      return { 'minLengthArray': {valid: false }};
  }
}

@Component({
  selector: 'pmo-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;
  restaurant: Restaurant;
  isLoading = true;
  items: FormArray;
  orderTotal = 0.0;
  completedOrder: Order;
  orderComplete = false;
  orderProcessing = false;
  private unSubscribe = new Subject<void>();

  constructor(
    private route: ActivatedRoute, 
    private restaurantService: RestaurantService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private itemTotal: ItemTotalPipe
  ) { 
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    this.restaurantService.getRestaurant(slug).subscribe((data:Restaurant) => {
      this.restaurant = data;
      this.isLoading = false;      
      this.createOrderForm();
    })
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  createOrderForm() {
    this.orderForm = this.formBuilder.group({
      restaurant: [this.restaurant._id],
      name: [null, Validators.required],
      address:  [null, Validators.required],
      phone: [null, Validators.required],
      items: [[], minLengthArray(1)]
    });
    this.onChanges();
  }

  onChanges() {
    this.orderForm.get('items').valueChanges.pipe(takeUntil(this.unSubscribe)).subscribe((val: Item[])=> {

      this.orderTotal = this.itemTotal.transform(val);

    });
  }

  onSubmit() {
    this.orderProcessing = true;
    this.orderService.createOrder(this.orderForm.value).subscribe((res: Order) => {
      this.completedOrder = res;
      this.orderComplete = true;
      this.orderProcessing = false;
    });
  }

  startNewOrder() {
    this.orderComplete = false;
    this.orderTotal = 0.0;
    this.createOrderForm();
  }

}
