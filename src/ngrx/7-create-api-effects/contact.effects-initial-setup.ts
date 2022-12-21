import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ContactActions from './contact.actions';

@Injectable()
export class ContactEffects {
  submit$ = createEffect(() => {// Create effect
    return this.actions$.pipe(// Listen for all dispatched Actions
      ofType(ContactActions.submit),// Filter for submit Action
      // ...
    );
  });
 
  constructor(private actions$: Actions) {}

  private handleSubmit(emailAddress: string, fullName: string): Observable<number> {/* ... */}

  private getErrorMessage(error: unknown): string {/* ... */}
}