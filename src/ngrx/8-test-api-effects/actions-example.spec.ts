// Note: This example code is not part of our application repo or solution

describe('login$', () => {
  beforeEach(() => {
    // Mock `actions$` with `Observable` that emits an Action
    // and its payload for upcoming tests
    actions$ = of(
      LoginActions.login({
        username: 'some-username',
        password: 'some-password',
      })
    );
  });

  it('should...', () => {
    effects.login$.subscribe(action => {
      // This `action` value will be whatever Action is dispatched
      // based on our mocked value for `actions$`
    });
  });
});
