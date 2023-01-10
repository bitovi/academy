@page learn-ngrx/test-api-effects Testing API Effects
@parent learn-ngrx 8

@description Learn how to write unit tests for NgRx Effects.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/create-api-effects) to get your codebase ready to work on this section.


## Overview

1. Verify `LoginActions.loginSuccess` Action dispatches when API request is successful.

2. Verify `LoginActions.loginFailure` Action dispatches when API request fails.

3. Verify `LoginActions.logoutSuccess` Action dispatches when API request is successful.

4. Verify `LoginActions.logoutFailure` Action dispatches when API request fails.


## Running Tests

To run unit tests in your project, you can either use the `test` npm script, or the `ng test` command:

```bash
npm run test
# or
ng test --watch
```

The `--watch` switch will rerun your tests whenever a code file changes. You can skip it to just run all tests once.


## Description

TODO: 

You'll need to copy the contents of the test file to run tests for your Effects.


## Final Result

At the end of this section, the following spec file(s) should be updated. After each spec file has been updated and all the tests have passed, this means that all the previous sections have been completed successfully:

<details>
<summary>src/app/store/login/login.effects.spec.ts</summary>
@diff ../7-create-api-effects/login.effects.spec.ts ./login.effects.spec.ts only
</details>


> **Wrap-up**: By the end of this section, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-api-effects). You can also compare the [code changes for our solution to this section](https://github.com/bitovi/angular-ngrx-chat/compare/create-api-effects...test-api-effects) on GitHub or you can use the following command in your terminal:

```bash
git diff origin/test-api-effects
```
