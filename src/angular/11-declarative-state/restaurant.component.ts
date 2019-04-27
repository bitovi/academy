import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map, flatMap, tap, shareReplay } from 'rxjs/operators';

import { RestaurantService, ResponseData, State, City } from './restaurant.service';
import { Restaurant } from './restaurant';

export interface Data<T> {
    value: Array<T>;
    isPending: boolean;
}

const toData = map(function<T>(response: ResponseData<T>) : Data<T> {
    return {
        value: response.data,
        isPending: false
    }
});

// returns a stream operator that enables / disable a form control when appropriate based on the state of it's data
function getFormControlEnableHandler(form: FormGroup, fieldName: string) {
    return tap((data: Data<any>) => {
        if (!data.value || data.value.length === 0) {
            form.get(fieldName).disable();
        } else {
            form.get(fieldName).enable();
        }
    });
}

@Component({
    selector: 'pmo-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit {
    public form: FormGroup;

    public restaurants: Observable<Data<Restaurant>>;
    public states: Observable<Data<State>>;
    public cities: Observable<Data<City>>;

    constructor(
        private restaurantService: RestaurantService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.createForm();

        this.states = this.restaurantService.getStates().pipe(
            toData,
            getFormControlEnableHandler(this.form, 'state'),
            startWith({ isPending: true, value: [] }),
            shareReplay(1),
        );

        this.cities = this.form.get('state').valueChanges.pipe(
            startWith(''),
            tap(() => {
                this.form.get('city').patchValue('');
            }),
            flatMap((state) => {
                if (state) {
                    return this.restaurantService.getCities(state).pipe(
                        toData,
                        startWith({ isPending: true, value: [] })
                    )
                } else {
                    return of({ isPending: false, value: [] });
                }
            }),
            getFormControlEnableHandler(this.form, 'city'),
            shareReplay(1),
        );

        this.restaurants = this.form.get('city').valueChanges.pipe(
            startWith(''),
            flatMap((city) => {
                const state = this.form.get('state').value;
                if (city && state) {
                    return this.restaurantService.getRestaurants(state, city).pipe(
                        toData,
                        startWith({ isPending: true, value: [] })
                    )
                } else {
                    return of({ isPending: false, value: [] });
                }
            }),
            shareReplay(1),
        )
    }

    createForm() {
        this.form = this.fb.group({
            state: { value: '', disabled: true },
            city: { value: '', disabled: true },
        });
    }
}