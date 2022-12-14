@page learn-ngrx/test-api-effects Testing API Effects
@parent learn-ngrx 8

@description Learn how to write unit tests for NgRx Effects.

@body


> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-api-effcts) to get your codebase ready to work on this part.

## Running Tests

To run unit tests in your project, you can either use the `test` npm script, or the `ng test` command:

```bash
npm run test
# or
ng test --watch
```

The `--watch` switch will rerun your tests whenever a code file changes. You can skip it to just run all tests once.


## Test Code

You'll need to copy the contents the test file to run tests for your Effects.
### Update `login.effects.spec.ts` 

Copy the following code to replace the contents of `src/app/store/login/login.effects.spec.ts`:

<details>
<summary>src/app/store/login/login.effects.spec.ts</summary>
@sourceref ./login.effects.spec.ts
</details>


> **Wrap-up**: By the end of this part, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-api-effects).You can also compare the [code changes for our solution to this part](https://github.com/bitovi/angular-ngrx-chat/compare/create-api-effects...test-api-effects) on GitHub.