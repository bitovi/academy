@page learn-ngrx/test-actions Testing Actions
@parent learn-ngrx 6

@description Learn how to write unit tests for NgRx actions.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/dispatch-actions) to get your codebase ready to work on this part.

## Running Tests

To run unit tests in your project, you can either use the `test` npm script, or the `ng test` command:

```bash
npm run test
# or
ng test --watch
```

The `--watch` switch will rerun your tests whenever a code file changes. You can skip it to just run all tests once.


## Test Code

You'll need to copy the contents of two test files to run tests for your Actions. Note that we don't typically test Actions directly, we test their use (in Components, effects, reducers) but for the purposes of this lesson, we've included Action tests to make sure your code is in good shape!

### Update `dashboard.component.spec.ts` 

Copy the following code to replace the contents of `src/app/dashboard/dashboard.component.spec.ts`:

<details>
<summary>src/app/dashboard/dashboard.component.spec.ts</summary>
@sourceref ./dashboard.component.spec.ts
</details>

### Update `login.component.spec.ts`

Copy the following code to replace the contents of `src/app/dashboard/dashboard.component.spec.ts`:

<details>
<summary>src/app/login/login.component.spec.ts</summary>
@sourceref ./login.component.spec.ts
</details>

> **Wrap-up**: By the end of this part, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-actions).You can also compare the [code changes for our solution to this part](https://github.com/bitovi/angular-ngrx-chat/compare/dispatch-actions...test-actions) on GitHub.
