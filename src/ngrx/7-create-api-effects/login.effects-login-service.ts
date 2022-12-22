// src/app/store/login/login.effects.ts

import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { LoginService } from 'ngx-learn-ngrx';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private loginService: LoginService) {}

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
}
