import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable, of, pipe, UnaryFunction } from 'rxjs';
import { catchError, map, mergeMap, shareReplay, startWith, tap } from 'rxjs/operators';

import { Restaurant } from './restaurant.interface';
import { City, ResponseData, RestaurantService, State } from './restaurant.service';

// represent all the possible states of a request
export interface RequestStatus<T> {
  data: Array<T>;
  error: string,
  // TODO: represent statuses as enum?
  isPending: boolean;
  isResolved: boolean;
  isRejected: boolean;
  isAwaitingInput: boolean;
}

// in a complete app this would be a function exported by some component that manages popup messages rather than the trivial implementation seen here
function openErrorPopup(message) {
  alert(message);
}

// transform ResponseData into successful RequestStatus
const responseToRequestStatus = map(function<T>(response: ResponseData<T>): RequestStatus<T> {
  return {
    data: response.data,
    error: null,
    isPending: false,
    isResolved: true,
    isRejected: false,
    isAwaitingInput: false,
  }
});

// an operator that takes input for a request, makes a request via a provided function, and provides an appropriate RequestStatus
function makeRequest<T>(requestFunction: (args:any) => Observable<ResponseData<T>>)
    :UnaryFunction<Observable<any>, Observable<RequestStatus<T>>> {
  return pipe(
    mergeMap(requestArguments => {
        const responseStream = requestFunction(requestArguments);

        // awaiting input case where the requestFunction hasn’t made a request yet
        if (!responseStream) {
          return of({
            data: [],
            error: null,
            isPending: false,
            isResolved: false,
            isRejected: false,
            isAwaitingInput: true
          })
        }

        return responseStream.pipe(
            responseToRequestStatus, // handle the successful case
            startWith({ // handle the in-progress case
              data: [],
              error: null,
              isPending: true,
              isResolved: false,
              isRejected: false,
              isAwaitingInput: false,
            }),
            catchError((err) => { // handle the failed case
              return of({
                data: [],
                error: err.message || JSON.stringify(err, null, 2),
                isPending: false,
                isResolved: false,
                isRejected: true,
                isAwaitingInput: false,
              });
            })
        )
      }),
      shareReplay(1))
}

// operator that checks if the incoming requests haven’t yet succeeded
const isRequestIncomplete = pipe(map<RequestStatus<any>, boolean>((requestStatus) => !requestStatus.isResolved));

// operator that shows failed RequestStatus emissions as popups, used when the isRejected case isn’t handled in the view
// TODO: rather than tap, provide a stream to some singleton component?
//       would require a subscription though, possibly triggering requests early :/
const showErrorsAsPopups = pipe(
    tap<RequestStatus<any>>(request => {
      if (request.isRejected) openErrorPopup(request.error)
    }),
    shareReplay(1)
);

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit {
  public restaurants: Observable<RequestStatus<Restaurant>>;
  public states: Observable<RequestStatus<State>>;
  public cities: Observable<RequestStatus<City>>;

  public selectedState = new BehaviorSubject('');
  public selectedCity = new BehaviorSubject('');
  public displayedCity: Observable<string>;
  public stateSelectDisabled: Observable<boolean>;
  public citySelectDisabled: Observable<boolean>;

  constructor(
      private restaurantService: RestaurantService
  ) {}

  ngOnInit() {
    this.states = of(null).pipe(
        makeRequest(() => this.restaurantService.getStates()),
        showErrorsAsPopups
    );
    this.stateSelectDisabled = this.states.pipe(isRequestIncomplete);

    this.cities = this.selectedState.pipe(
        makeRequest((state) => state ? this.restaurantService.getCities(state) : null),
        showErrorsAsPopups
    );
    this.citySelectDisabled = this.cities.pipe(isRequestIncomplete);
    this.displayedCity = merge(
        this.selectedState.pipe(map(() => '')),
        this.selectedCity
    );

    this.restaurants = combineLatest(this.displayedCity, this.selectedState).pipe(
        makeRequest(([city, state]) => city && state ? this.restaurantService.getRestaurants(state, city) : null)
    )
  }
}
