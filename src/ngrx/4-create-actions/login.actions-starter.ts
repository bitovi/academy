import { createAction, props } from '@ngrx/store';

export const loadLogins = createAction(
  '[Login] Load Logins'
);

export const loadLoginsSuccess = createAction(
  '[Login] Load Logins Success',
  props<{ data: any }>()
);

export const loadLoginsFailure = createAction(
  '[Login] Load Logins Failure',
  props<{ error: any }>()
);