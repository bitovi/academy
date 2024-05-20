@page learn-react-native/creating-a-new-app Creating a New Application
@parent learn-react-native 3
@outline 3

@description Generate a new React Native application using the CLI.

@body

## Overview

In this section, you will:

- Use the React Native CLI to generate a new React Native application.
- Test code with React Testing Library.
- Add code quality tools.

## Objective 1: Generate the “Place My Order” application

Create a new React Native application named “Place My Order” that supports TypeScript and can be emulated and tested.

<figure>
  <img alt="A mobile phone displaying the root page of the newly created application served by the dev server. The page displays a 'Welcome to React Native' header and some miscellaneous instructions that we will be disregarding." src="../static/img/react-native/03-creating-a-new-app/01-generated-app.png" width="600px" />
  <figcaption style="font-style: italic">
    Screen capture of the completed exercise.
  </figcaption>
</figure>

### Using the React Native CLI

React Native has a built-in command line interface.
Rather than install and manage a specific version of the CLI globally, we recommend you access the current version at runtime using `npx`, which ships as part of npm.
With `npx react-native <command>`, the current stable version of the CLI will be downloaded and executed at the time the command is run.

### Setup 1

✏️ Open a terminal and move to a location where you want to generate your React application, then execute the following command:

```shell
npx react-native@0.74.1 init PlaceMyOrder --version 0.74.1
```

The command runs `npx`, using `react-native` to create a new React Native application named "PlaceMyOrder with [TypeScript](https://www.typescriptlang.org/) support.

✏️ Now `cd` into the new directory created for the application:

```shell
cd PlaceMyOrder
```

When cloning a project from a git repository, it will also be necessary to run `npm install` in the directory, but the app setup has done this for us already.

### Verify 1

Once you have completed the previous step you will be able to start the development server and see the default welcome page.

The development server is a useful tool. When it starts, it [transpiles](https://en.wikipedia.org/wiki/Source-to-source_compiler) the TypeScript and JSX code into JavaScript and bundles it for delivery to the device. It also watches for changes to the source code, and when they occur, it repeats the process, then causes the device to reload with those changes.

✏️ Start the virtual device you created in the previous module.

✏️ Run the command:

```shell
npm run start
```

✏️ Press the `a` key to run the app on the open Android virtual device.

The first time you run it for a given target will take significantly longer than subsequent runs. Once open, you should see the default "Welcome to React Native" screen.

## Objective 2: Add testing infrastructure

### Testing code with React Testing Library

We will create unit tests for our application using the [React Native Testing Library](https://callstack.github.io/react-native-testing-library/). The unit tests for components will be focused on verifying that a component creates the correct output based on the state the component is provided. We also need to create tests for any React custom Hooks we create to ensure they provide the expected results.

### Setup 2

Before we can create or execute any tests, run the following command to install the packages related to the React Native Testing Library:

✏️ Run:

```shell
npm install --save-dev @testing-library/react-native@12 @types/jest@29
```

✏️ Create **jest-setup.ts** and update it to be:

@sourceref ../../../exercises/react-native/03-creating-a-new-app/02-solution/jest-setup.ts

✏️ Update **jest.config.js** to be:

@diff ../../../exercises/react-native/03-creating-a-new-app/01-solution/jest.config.js ../../../exercises/react-native/03-creating-a-new-app/02-solution/jest.config.js only

✏️ Delete the unneeded generated folder `__tests__`.

✏️ Create **App.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/03-creating-a-new-app/02-solution/App.test.tsx

✏️ Update **App.tsx** to be:

@sourceref ../../../exercises/react-native/03-creating-a-new-app/02-solution/App.tsx

### Verify 2

After completing the previous steps you will be able to run unit tests. Execute the command:

```shell
npm run test
```

and "Test Suites: 1 passed, 1 total" will be written to the console.

## Objective 3: Clean up the generated code and add helpers

Before we begin adding any content, it’s a good idea to clean up generated files and add code quality tools.

### Setup 3

✏️ Run:

```shell
npm install --save-dev @bitovi/eslint-config@1 depcheck@1
```

✏️ Update **package.json** to be:

@sourceref ../../../exercises/react-native/03-creating-a-new-app/03-solution/package.json
@highlight 7-10, 12-17, 21, 49, only

✏️ Update **.prettierrc.js** to be:

@diff ../../../exercises/react-native/03-creating-a-new-app/02-solution/.prettierrc.js ../../../exercises/react-native/03-creating-a-new-app/03-solution/.prettierrc.js only

✏️ Create **.depcheckrc** and update it to be:

@sourceref ../../../exercises/react-native/03-creating-a-new-app/03-solution/.depcheckrc

✏️ Update **.eslintrc.js** to be:

@diff ../../../exercises/react-native/03-creating-a-new-app/02-solution/.eslintrc.js ../../../exercises/react-native/03-creating-a-new-app/03-solution/.eslintrc.js only

✏️ Update **metro.config.js** to be:

@sourceref ../../../exercises/react-native/03-creating-a-new-app/03-solution/metro.config.js
@highlight 1, only

✏️ Now that we have prettier and eslint set up, we need to make sure our code is following the new standards. You can apply most of the rules automatically. Run:

```shell
npm run lint:fix
```

Note: If you installed the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) VS Code plugins and enable "format on save" in the settings, VS Code will make the necessary changes any time you save a file too!

### Verify 3

✏️ Run the new code quality scripts.

```shell
npm run typecheck
npm run eslint
npm run prettier
npm run depcheck
```

These scripts should all pass successfully. You can run all of these, and the tests, with

```shell
npm run precheck
```

## Next steps

Next, let’s [learn about JSX](./intro-to-jsx.html) to understand React’s templating language.
