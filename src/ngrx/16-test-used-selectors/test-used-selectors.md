@page learn-ngrx/test-used-selectors Testing Selector Use
@parent learn-ngrx 16

@description Learn how to write unit tests for a Component making use of NgRx Selectors.

@body

> **Quick Start**: You can checkout [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/use-selectors) to get your codebase ready to work on this section.


## Running Tests

To run unit tests in your project, you can either use the `test` npm script, or the `ng test` command:

```bash
npm run test
# or
ng test --watch
```

The `--watch` switch will rerun your tests whenever a code file changes. You can skip it to just run all tests once.


## Test Code

You'll need to copy the contents of the test file to run tests for the Selectors used within the `DashboardComponent`.

### Update `dashboard.component.spec.ts` 

Copy the following code to replace the contents of `src/app/dashboard/dashboard.component.spec.ts`:

<details>
<summary>src/app/dashboard/dashboard.component.spec.ts</summary>
@sourceref ./dashboard.component.spec.ts
</details>


> **Wrap-up**: By the end of this section, your code should match [this branch](https://github.com/bitovi/angular-ngrx-chat/tree/test-used-selectors). You can also compare the [code changes for our solution to this section](https://github.com/bitovi/angular-ngrx-chat/compare/use-selectors...test-used-selectors) on GitHub or you can use the following command in your terminal:

```bash
git diff origin/test-used-selectors
```
