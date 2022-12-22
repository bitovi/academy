import { Injectable } from '@angular/core';
import { Observable, exhaustMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ContactActions from './contact.actions';

@Injectable()
export class ContactEffects {
  submitSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContactActions.submitSuccess),
      exhaustMap(({ confirmationNumber }) =>
        // call `showModal()`, but doesn't `map` to some Action
        this.showModal(confirmationNumber)
      )
    );
  }, { dispatch: false });
 
  constructor(private actions$: Actions) {}

  private showModal(confirmationNumber: number): Observable<void> {/* ... */}
}
