import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
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

export interface Item {
  name: string;
  price: number;
}

export interface OrderForm {
  restaurant: FormControl<string>;
  name: FormControl<string>;
  address: FormControl<string>;
  phone: FormControl<string>;
  items: FormControl<Item[]>;
}

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
  styleUrl: './order.component.less',
})
export class OrderComponent implements OnInit, OnDestroy {
  orderForm?: FormGroup<OrderForm>;
  restaurant?: Restaurant;
  isLoading = true;
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
    this.orderForm = this.formBuilder.nonNullable.group({
      restaurant: [this.restaurant?._id ?? '', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      // PASSING OUR CUSTOM VALIDATION FUNCTION TO THIS FORM CONTROL
      items: [[] as Item[], minLengthArray(1)],
    });
    this.onChanges();
  }

  getChange(newItems: Item[]): void {
    this.orderForm?.controls.items.patchValue(newItems);
  }

  onChanges(): void {
    // WHEN THE ITEMS CHANGE WE WANT TO CALCULATE A NEW TOTAL
    this.orderForm?.controls.items.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value) => this.calculateTotal(value));
  }

  calculateTotal(items: Item[]): void {
    let total = 0.0;
    if (items.length) {
      for (const item of items) {
        total += item.price;
      }
      this.orderTotal = Math.round(total * 100) / 100;
    } else {
      this.orderTotal = total;
    }
  }

  onSubmit(): void {
    if (!this.orderForm?.valid) {
      return;
    }

    this.orderProcessing = true;
    this.orderService
      .createOrder(this.orderForm.getRawValue())
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: Order) => {
        this.completedOrder = res;
        this.orderComplete = true;
        this.orderProcessing = false;
      });
  }

  startNewOrder(): void {
    this.orderComplete = false;
    this.completedOrder = undefined;
    this.orderTotal = 0.0;
    // CLEAR THE ORDER FORM
    this.createOrderForm();
  }
}
