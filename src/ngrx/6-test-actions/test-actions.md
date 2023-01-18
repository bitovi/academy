@page learn-ngrx/test-actions Testing Actions
@parent learn-ngrx 6

@description Learn how to write unit tests for NgRx Actions.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/dispatch-actions) to get your codebase ready to work on this section.


## Overview

1. Verify `LoginActions.logout` Action dispatches when calling `logout()`.

2. Verify `LoginActions.login` Action dispatches with form payload when calling `login()`.


## Running Tests

To run unit tests in your project, you can either use the `test` npm script, or the `ng test` command:

```bash
npm run test
# or
ng test --watch
```

The `--watch` switch will rerun your tests whenever a code file changes. You can skip it to just run all tests once.


## Description

TODO: remove or use parts of for an intro for the section

You'll need to copy the contents of two test files to run tests for your Actions. Note that we don't typically test Actions directly, we test their use (in Components, effects, reducers) but for the purposes of this lesson, we've included Action tests to make sure your code is in good shape!


## Final Result

At the end of this section, the following spec file(s) should be updated. After each spec file has been updated and all the tests have passed, this means that all the previous sections have been completed successfully:

<details>
<summary>src/app/dashboard/dashboard.component.spec.ts</summary>
@diff ../5-dispatch-actions/dashboard.component.spec.ts ./dashboard.component.spec.ts only
</details>

<details>
<summary>src/app/login/login.component.spec.ts</summary>
@diff ../5-dispatch-actions/login.component.spec.ts ./login.component.spec.ts only
</details>


> **Wrap-up**: By the end of this section, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-actions). You can also compare the [code changes for our solution to this section](https://github.com/bitovi/angular-ngrx-chat/compare/dispatch-actions...test-actions) on GitHub or you can use the following command in your terminal:

```bash
git diff origin/test-actions
```
