// src/app/store/login/login.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as LoginActions from './login.actions';


@Injectable()
export class LoginEffects {

  loadLogins$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(LoginActions.loadLogins),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => LoginActions.loadLoginsSuccess({ data })),
          catchError(error => of(LoginActions.loadLoginsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
