// src/app/store/login/login.selectors.spec.ts

import * as fromLogin from './login.reducer';
import {
  selectLoginState,
  selectUserId,
} from './login.selectors';

describe('Login Selectors', () => {
  let state: fromLogin.LoginPartialState;

  beforeEach(() => {
    state = {
      [fromLogin.loginFeatureKey]: {
        ...fromLogin.initialState,
        userId: 'some-user-id',
        username: 'some-username',
        token: 'some-token',
      },
    };
  });

  it('should select the feature state', () => {
    const result = selectLoginState(state);

    expect(result).toEqual({
      userId: 'some-user-id',
      username: 'some-username',
      token: 'some-token',
    });
  });

  describe('selectUserId', () => {
    it('should return userId from login state', () => {
      const result = selectUserId(state);

      expect(result).toBe('some-user-id');
    });
  });
});
