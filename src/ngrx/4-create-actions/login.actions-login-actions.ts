// src/app/store/login/login.actions.ts

import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login API] Login Success',
  props<{ userId: string; username: string; token: string }>()
);

export const loginFailure = createAction(
  '[Login API] Login Failure',
  props<{ errorMsg: string }>()
);
