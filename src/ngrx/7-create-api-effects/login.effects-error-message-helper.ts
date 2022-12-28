// src/app/store/login/login.effects.ts

import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions) {}

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
}
