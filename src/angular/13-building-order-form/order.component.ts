import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';

import { RestaurantService } from '../restaurant/restaurant.service';
import { Restaurant } from '../restaurant/restaurant';
import { Subscription } from 'rxjs';

//CUSTOM VALIDATION FUNCTION TO ENSURE THAT THE ITEMS FORM VALUE CONTAINS AT LEAST ONE ITEM. 
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
  isLoading: boolean = true;
  items: FormArray;
  orderTotal: number = 0.0;
  completedOrder: any;
  orderComplete: boolean = false;
  orderProcessing: boolean = false;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private restaurantService: RestaurantService,
    private formBuilder: FormBuilder 
  ) { 
  }

  ngOnInit() {
    //GET THE RESTAURANT FROM THE ROUTE SLUG
    
  }

  ngOnDestroy(): void {
  }

  createOrderForm() {
    //CREATE AN ORDER FORM TO COLLECT: RESTAURANT ID, NAME, ADDRESS, PHONE, AND ITEMS
    // ITEMS SHOULD USE THE CUSTOM MINLENGTH ARRAY VALIDATION
    this.orderForm = this.formBuilder.group({
    });
    this.onChanges();
  }

  onChanges() {
    // SUBSCRIBE TO THE ITEMS FORMCONTROL CHANGE TO CALCULATE A NEW TOTAL
      // let total = 0.0;
      // val.forEach((item: any) => {
      //   total += item.price;
      // });
      // this.orderTotal = Math.round(total * 100) / 100;
  }

  startNewOrder() {
    this.orderComplete = false;
    this.completedOrder = this.orderForm.value;
    //CLEAR THE ORDER FORM
    this.createOrderForm();
  }

}
