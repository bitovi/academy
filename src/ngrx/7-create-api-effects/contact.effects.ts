// Note: This example code is not part of our application repo or solution
import { Injectable } from '@angular/core';
import { Observable, catchError, map, exhaustMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ContactActions from './contact.actions';

@Injectable()
export class ContactEffects {
  submit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContactActions.submit),
      exhaustMap(({ emailAddress, fullName }) =>
        this.handleSubmit(emailAddress, fullName).pipe(
          map((confirmationNumber) =>
            ContactActions.submitSuccess({ confirmationNumber })
          ),
          catchError((error: unknown) =>
            of(
              // Return an Action on failure
              ContactActions.submitFailure({
                errorMsg: this.getErrorMessage(error),
              })
            )
          )
        )
      )
    );
  });
 
  constructor(private actions$: Actions) {}

  private handleSubmit(emailAddress: string, fullName: string): Observable<number> {/* ... */}

  private getErrorMessage(error: unknown): string {/* ... */}
}
