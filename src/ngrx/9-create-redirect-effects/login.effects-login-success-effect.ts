// src/app/store/login/login.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LoginActions from './login.actions';
import { LoginService } from 'ngx-learn-ngrx';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.login),
      exhaustMap(({ username, password }) =>
        this.loginService.login({ username, password }).pipe(
          map(({ userId, token }) =>
            LoginActions.loginSuccess({ userId, username, token })
          ),
          catchError((error: unknown) =>
            of(
              LoginActions.loginFailure({
                errorMsg: this.getErrorMessage(error),
              })
            )
          )
        )
      )
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LoginActions.loginSuccess),
        exhaustMap(() => this.router.navigate(['dashboard']))
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.logout),
      exhaustMap(() =>
        this.loginService.logout().pipe(
          map(() => LoginActions.logoutSuccess()),
          catchError((error: unknown) =>
            of(
              LoginActions.logoutFailure({
                errorMsg: this.getErrorMessage(error),
              })
            )
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router
  ) {}

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
}
