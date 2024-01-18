import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Restaurant } from '../restaurant/restaurant';
import { RestaurantService } from '../restaurant/restaurant.service';

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
  styleUrls: ['./order.component.less'],
})
export class OrderComponent implements OnInit, OnDestroy {
  orderForm?: FormGroup<OrderForm>;
  restaurant?: Restaurant;
  isLoading = true;
  orderTotal = 0.0;
  completedOrder: any;
  orderComplete = false;
  orderProcessing = false;
  private onDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // GET THE RESTAURANT FROM THE ROUTE SLUG
  }

  ngOnDestroy(): void {}

  createOrderForm(): void {
    // CREATE AN ORDER FORM TO COLLECT: RESTAURANT ID, NAME, ADDRESS, PHONE, AND ITEMS
    // ITEMS SHOULD USE THE CUSTOM MINLENGTH ARRAY VALIDATION
    this.orderForm = this.formBuilder.nonNullable.group({});
    this.onChanges();
  }

  onChanges(): void {
    // SUBSCRIBE TO THE ITEMS FORMCONTROL CHANGE TO CALCULATE A NEW TOTAL
  }

  onSubmit(): void {}

  startNewOrder(): void {
    this.orderComplete = false;
    this.completedOrder = undefined;
    // CLEAR THE ORDER FORM
    this.createOrderForm();
  }
}
