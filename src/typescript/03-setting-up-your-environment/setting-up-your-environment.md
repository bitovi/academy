@page learn-typescript/setting-up-your-environment Setting Up Your Environment
@parent learn-typescript 3
@outline 2

@description Learn how to set up a Node environment with TypeScript.

@body

## Overview

In this section, you will:

- Install Node.js and npm
- Use npm to initialize a new Node application
- Add TypeScript to a project
- Use `ts-node` to run TypeScript

## Objective 1: Install prerequisites

Before we start writing code, we need to install the prerequisites.

### Installing Node.js and npm

This course requires the [Node.js](https://nodejs.org/) JavaScript runtime
environment. Node.js and its included package manager `npm` will be used to do a
variety of tasks, including: installing required packages, compiling TypeScript files into JavaScript,
and executing tests.

This course requires Node.js v18.17.0 or newer, or v20.1.0 or newer.

### Setup 1

Follow [npm’s instructions to install Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

During the installation process, you may be prompted to make selections or install prerequisites.
Use the default selections and proceed with the installation.

The installation process can take 10 to 15 minutes to complete.

#### macOS

On macOS, we recommend [using nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
to install Node because it allows you to manage multiple versions of Node for different projects.

#### Windows

On Windows, we recommend [using NVM for Windows](https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#overview)
to install Node because it allows you to manage multiple versions of Node for different projects.

You can also follow [Microsoft’s instructions for setting up Node.js on Windows](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).

For some of the instructions, you may need to [open the command prompt or PowerShell as an administrator](https://www.howtogeek.com/194041/how-to-open-the-command-prompt-as-administrator-in-windows-10/).

### Verify 1

✏️ Run the following command to verify Node.js is installed correctly:

```shell
node --version
```

The output of the command will be the current version of Node.js.
It should start with either “v18” or “v20”.

✏️ Run the following command to verify `npm` is installed correctly:

```shell
npm --version
```

The output of the command will be the current version of `npm`.
It should start with either “9” or “10”.

## Objective 2: Initialize a Node project

Let’s create a new Node project that supports TypeScript and can be tested.

### Using npm to initialize a new Node application

For this course, we will use `npm` to initialize our application.

[npm](https://www.npmjs.com) is a command line interface (CLI) tool that is used
in every Node.js project. npm’s primary purpose is to take a list of dependencies
in a project (in the `package.json` file) and install them locally.

[`npm init`](https://docs.npmjs.com/cli/v10/commands/npm-init) is the command for
creating a new `package.json` file.

### Setup 2

✏️ Run the following command to create a new `learn-typescript` folder:

```shell
mkdir learn-typescript
```

✏️ Run the following command to change directories (`cd`):

```shell
cd learn-typescript
```

Now `cd` into the new directory created for the application, initialize the `package.json`,
and install the required packages:

✏️ Run the following command to create a new `package.json` file:

```shell
npm init --yes
```

### Verify 2

Your `learn-typescript` folder should now have one file:

```code
├── package.json
```

## Objective 3: Install TypeScript

### Adding TypeScript to a project

This entire course will focus on TypeScript, so we’ll need to add it to our project!

Other tutorials may encourage you to install TypeScript globally, but this has the downside of
using one TypeScript version for all of your projects.

Instead, we think it’s best to install TypeScript as a dependency to your project so the
version is always correct.

### Setup 3

✏️ Run the following command to add the `typescript` package to your project:

```shell
npm install --save-dev typescript@~5.4
```

✏️ Run the following command to create the `tsconfig.json` file in your project:

```shell
npx tsc --init
```

In the command above, `npx` will find the `tsc` (TypeScript) binary in our `node_modules` folder.

### Verify 3

Your `learn-typescript` folder should now have these files:

```code
├── node_modules/
├── package-lock.json
├── package.json
├── tsconfig.json
```

## Objective 4: Create your first TypeScript file

### Using `ts-node` to run TypeScript

Out of the box, Node.js does not have any support for TypeScript.

We will install a dependency called `ts-node` that will compile our TypeScript to JavaScript
before running it.

Once we have `ts-node` installed, we can use `npx` again to run the `ts-node` binary.

### Setup 3

✏️ Run the following command to add the `ts-node` package to your project:

```shell
npm install --save-dev ts-node@10
```

✏️ Run the following command to create the `src` and `src/hello-world` folders:

```shell
mkdir -p src/hello-world
```

✏️ Create **src/hello-world/hello-world.ts** and update it to be:

@sourceref ../../../exercises/typescript/02-setting-up-your-environment/04-solution/src/hello-world/hello-world.ts

### Verify 4

✏️ Run the following command to run the TypeScript code:

```
npx ts-node src/hello-world/hello-world.ts
```

After running this command, you should see:

```
Greeting: Hello, World
```

Congrats! You’ve written and run your first TypeScript application.

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/02-setting-up-your-environment/04-solution?file=src/hello-world/hello-world.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/02-setting-up-your-environment/04-solution?file=src/hello-world/hello-world.ts).

## Bonus challenge

Change the `user` variable to a number and compile again. What do you think will happen?

You should see an error message.

<details>
<summary>View the error message.</summary>
<a href="../static/img/typescript-error-compiling.png"><img alt="A screenshot of an Integrated Development Environment (IDE) showing TypeScript code. The code attempts to greet a user by displaying “Hello,” followed by a user’s name. However, a numeric value is passed instead of a string, causing a compilation error highlighted in the terminal at the bottom." src="../static/img/typescript-error-compiling.png" width="100%"/></a>
</details>

## Next steps

Next, let’s [configure our TypeScript](./configuration.html) project.
