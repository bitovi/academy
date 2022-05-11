import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Restaurant } from '../restaurant/restaurant';
import { RestaurantService } from '../restaurant/restaurant.service';
import { Order, OrderService } from './order.service';

// CUSTOM VALIDATION FUNCTION TO ENSURE THAT THE ITEMS FORM VALUE CONTAINS AT LEAST ONE ITEM.
function minLengthArray(min: number): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value.length >= min) {
      return null;
    }
    return { minLengthArray: { valid: false } };
  };
}

@Component({
  selector: 'pmo-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
})
export class OrderComponent implements OnInit, OnDestroy {
  orderForm?: FormGroup;
  restaurant?: Restaurant;
  isLoading = true;
  items?: FormArray;
  orderTotal = 0.0;
  completedOrder?: Order;
  orderComplete = false;
  orderProcessing = false;
  private onDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // GETTING THE RESTAURANT FROM THE ROUTE SLUG
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.restaurantService
        .getRestaurant(slug)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((data: Restaurant) => {
          this.restaurant = data;
          this.isLoading = false;
          this.createOrderForm();
        });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  createOrderForm(): void {
    this.orderForm = this.formBuilder.group({
      restaurant: [this.restaurant?._id],
      name: [null, Validators.required],
      address: [null, Validators.required],
      phone: [null, Validators.required],
      // PASSING OUR CUSTOM VALIDATION FUNCTION TO THIS FORM CONTROL
      items: [[], minLengthArray(1)],
    });
    this.onChanges();
  }

  getChange(newItems: []): void {
    const currentItems = this.orderForm?.get('items')?.value;

    for (let i = 0; i < newItems.length; i++) {
      const item = newItems[i];
      const idx = currentItems.indexOf(item);
      if (idx === -1) {
        currentItems.push(item);
      }
    }
    this.orderForm?.get('items')?.patchValue(newItems);
  }

  onChanges(): void {
    // WHEN THE ITEMS CHANGE WE WANT TO CALCULATE A NEW TOTAL
    this.orderForm
      ?.get('items')
      ?.valueChanges.pipe(takeUntil(this.onDestroy$))
      .subscribe((val) => {
        let total = 0.0;
        if (val.length) {
          for (const item of val) {
            total += item.price;
          }
          this.orderTotal = Math.round(total * 100) / 100;
        } else {
          this.orderTotal = total;
        }
      });
  }

  onSubmit(): void {
    this.orderProcessing = true;
    this.orderService
      .createOrder(this.orderForm?.value)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: Order) => {
        this.completedOrder = res;
        this.orderComplete = true;
        this.orderProcessing = false;
      });
  }

  startNewOrder(): void {
    this.orderComplete = false;
    this.completedOrder = this.orderForm?.value;
    this.orderTotal = 0.0;
    // CLEAR THE ORDER FORM
    this.createOrderForm();
  }
}
