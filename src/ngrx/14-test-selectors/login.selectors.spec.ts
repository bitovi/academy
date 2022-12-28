// src/app/store/login/login.selectors.spec.ts

import * as fromLogin from './login.reducer';
import {
  selectLoginState,
  selectToken,
  selectUserId,
  selectUsername,
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

  describe('selectUsername', () => {
    it('should return username from login state', () => {
      const result = selectUsername(state);

      expect(result).toBe('some-username');
    });
  });

  describe('selectToken', () => {
    it('should return token from login state', () => {
      const result = selectToken(state);

      expect(result).toBe('some-token');
    });
  });
});
