@page learn-react/setting-up-your-environment Setting Up Your Environment
@parent learn-react 2
@outline 3

@description Learn how to set up a React environment using Vite.

@body

## How to follow this course

This course will walk you through building an application with React. Each page of the guide is based on building a new feature, and may have multiple “objectives” to complete. Each objective will be explained and include the requirements and any setup steps needed. Most objectives will also include unit tests to update to verify when you have implemented the solution correctly.

The ✏️ icon will be used to indicate when commands need to be run or when files need to be created or updated.

If you have any issues or suggestions as you move through this training, we’d love for you to submit a <a href="https://github.com/bitovi/academy/issues/new">GitHub issue</a> for it! 💖

## Overview

In this section, we will:

- Learn about Node.js
- Recommend tools to use in React development
- Generate a new React application using Vite
- Set up testing
- Verify that the new application can be served to the browser and tested

## Objective 1: Install prerequisites

### Install a code editor

There are a variety of code editors that support React, the most popular is
Microsoft’s [Visual Studio Code](https://code.visualstudio.com/). VS Code is available for
most operating systems and has extensive support for React and JSX including:
code completion, code highlighting, and linting. It’s also used by cloud
environments like CodeSandbox and StackBlitz, making it easy to switch among
different runtime environments.

### Install Node.js and npm

Our solution requires the [Node.js](https://nodejs.org/) JavaScript runtime
environment. Node.js and its included package manager `npm` will be used to do a
variety of tasks including: installing required packages, running the
development server, executing tests, and building the application for
deployment.

### Setup 1

This course requires Node.js version 18 or 20 (we suggest using the long-term
support release of version 20).

[Download the Node.js installer](https://nodejs.org/en/download) for your operating system.
Any installation of Node.js will also include npm.

Alternatively, you can [install Node.js via package manager](https://nodejs.org/en/download/package-manager).

### Verify 1

✏️ Run the following command in a terminal to verify Node.js is installed correctly:

```shell
node --version
```

The output of the command will be the current version of Node.js, we expect it
to start with either "v18" or "v20".

✏️ Run the following command in a terminal to verify `npm` is installed correctly:

```shell
npm --version
```

The output of the command will be the current version of `npm`, we expect it
to start with either "9" or "10".

## Objective 2: Generate the “Place My Order” application

Create a new React application named “Place My Order” that supports TypeScript
and can be served and tested.

### Use Vite to generate a new React application

For this course we will use [Vite](https://vitejs.dev) to manage our React
project. Vite is a Node.js application that simplifies the creation,
development, testing, and building of web application frontends. We will use a
Vite "template" to specify that we are creating a React project with support for
TypeScript.

After generating the React app the following folders and files will be included
in the "place-my-order" folder:

```code
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
```

**/public** contains static assets which will be served up as part of your
website. You can include stylesheets, images and other static files.

**/src** is where all your React components should be stored alongside any logic
for your app. This will already be seeded with a small sample app.

**index.html** will render React by default.

**main.tsx** is the entry point of the React application. This is where our
application is initialized and mounted in the DOM.

**App.tsx** the contents displayed as the application’s root `/` web page.

### Setup 2

✏️ Open a terminal and move to a location where you want to generate your React
application, then execute the following command:

```shell
npm create vite@5 place-my-order -- --template react-ts
```

The command runs `npm` with `vite` to create a new application named
"place-my-order". Vite will use its "react-ts" template to generate the React
application with [TypeScript](https://www.typescriptlang.org/) support.

Now `cd` into the new directory created for the application and install the
required packages:

```shell
cd place-my-order
npm install
```

### Verify 2

Once you have completed the previous step you will be able to start the
development server and see the default welcome page.

✏️ Run the command:

```shell
npm run dev
```

The server will output the "Local" URL for the dev server, copy and paste it
into a browser. The browser will display a welcome page with "Vite + React."

## Objective 3: Add testing infrastructure

### Testing code with React Testing Library

We will create unit tests for our application using the [React Testing
Library](https://testing-library.com/docs/react-testing-library/intro/). The
unit tests for components will be focused on verifying that a component creates
the correct DOM output based on the state the component is provided. We also
need to create tests for any React custom Hooks we create to ensure they provide
the expected results.

### Setup 3

Before we can create or execute any tests, run the following command to
install the packages related to the React Testing Library:

✏️ Run:

```shell
npm install -D @testing-library/jest-dom@6 @testing-library/react@14 @testing-library/user-event@14 jsdom@24 vitest@1
```

✏️ Update **vite.config.ts** to be:

@diff ../../../exercises/react-vite/02-setting-up-your-environment/02-solution/vite.config.ts ../../../exercises/react-vite/02-setting-up-your-environment/04-solution/vite.config.ts

Once the packages are installed and the config file is updated, open the "package.json" file (in the
project’s root) and add the "test" line to the `scripts` object; this simplifies
running tests using Vite.

✏️ Update **package.json** to be:

@sourceref ../../../exercises/react-vite/02-setting-up-your-environment/03-solution/package.json
@highlight 10, only

### Verify 3

After completing the previous steps you will be able to run unit tests.
Execute the command:

```shell
npm run test
```

and "No test files found" will be written to the console.

## Objective 4: Update our first page

Now, let’s updated our generated app to include our own header:

<figure>
  <img alt="A web browser displaying the root page of the newly created application served by the dev server. The page displays a single level 1 heading with the text 'Place My Order App: Coming Soon!'" src="/static/img/react-vite/02-setting-up-your-environment/04-solution.png" width="600px" />
  <figcaption style="font-style: italic">
    Screen capture of the completed exercise.
  </figcaption>
</figure>

### Verify 4

✏️ Create **src/App.test.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/02-setting-up-your-environment/04-solution/src/App.test.tsx

### Exercise 4

This exercise will finish the objective of creating a new React application with
TypeScript support that can be served and tested. To complete the exercise make
code changes to accomplish the following:

- The root `/` web page shall display a single heading element with the text
  "Place My Order App: Coming Soon!"

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/02-setting-up-your-environment/problem?file=src/App.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/02-setting-up-your-environment/problem?file=src/App.tsx) to do this exercise in an online code editor.

### Solution 4

<details>

<summary>Click to see the solution</summary>

1. In your code editor open the file `src/App.tsx`
2. Delete all the `import` lines **except** `import "./App.css";`.
3. Delete the line `const [count, setCount] = useState(0)`
4. Replace the value of the return statement to be a single `<h1>` element
5. The source code of App.tsx should now look like the example below.

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-vite/02-setting-up-your-environment/03-solution/src/App.tsx ../../../exercises/react-vite/02-setting-up-your-environment/04-solution/src/App.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/02-setting-up-your-environment/solution?file=src/App.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/02-setting-up-your-environment/solution?file=src/App.tsx).

</details>

## Next steps

Next, let’s [learn about JSX](./intro-to-jsx.html) to understand React’s templating language.
