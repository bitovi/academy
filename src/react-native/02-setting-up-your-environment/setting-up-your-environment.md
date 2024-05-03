@page learn-react-native/setting-up-your-environment Setting Up Your Environment
@parent learn-react-native 2
@outline 3

@description Learn how to set up your environment for React Native development.

@body

## Overview

In this section, we will:

- Learn about Node.js
- Recommend tools to use in React Native development
- Set up required tools to use in React Native development

## Objective 1: Install prerequisites

### Install a code editor

There are a variety of code editors that support React, the most popular is Microsoft’s [Visual Studio Code](https://code.visualstudio.com/). VS Code is available for most operating systems and has extensive support for React and JSX including: code completion, code highlighting, and linting. It’s also used by cloud environments like CodeSandbox and StackBlitz, making it easy to switch among different runtime environments.

These VS Code extensions will help you format your code consistently:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Install Node.js and npm

Our solution requires the [Node.js](https://nodejs.org/) JavaScript runtime environment. Node.js and its included package manager `npm` will be used to do a variety of tasks including: installing required packages, running the development server, executing tests, and building the application for deployment.

### Install React Native and Dependencies

There are several dependencies used to create, build, and deploy a React Native application, and the specifics vary based on your development OS (MacOS, Windows, or Linux) and target OS (Android or iOS). Building for iOS require a MacOS computer, so this training only focuses on building for Android, though most of the techniques apply to all targets. Expo Go is a very convenient way to build simple React Native apps, though we will be using the official React Native CLI for this course, due to Expo Go's limitations.

### Setup 1

This course requires Node.js version 20 (we always suggest using the long-term support releases).

The simplest approach is to download the [Node.js installer](https://nodejs.org/en/download) for your operating system. Any installation of Node.js will also include npm.

Alternatively, you can [install Node.js via package manager](https://nodejs.org/en/download/package-manager); this is the reccomendation for most professional setups.

During the installation process you may be prompted to make selections or install prerequisites, use the default selections and proceed with the installation.

The installation process can take 10 to 15 minutes to complete.

### Verify 1

✏️ Run the following command in a terminal to verify Node.js is installed correctly.

🔦 _If you encounter an error running `node --version` you may need to restart for node to be completely installed._

```shell
node --version
```

The output of the command will be the current version of Node.js, we expect it to start with either "v18" or "v20".

✏️ Run the following command in a terminal to verify `npm` is installed correctly:

```shell
npm --version
```

The output of the command will be the current version of `npm`, we expect it to start with either "9" or "10".

### Setup 2

This course also requires several React Native dependencies, depending on your operating system.

Follow the setup instructions for [React Native CLI Quickstart for your development OS and an Android target OS](https://reactnative.dev/docs/environment-setup?guide=native&platform=android), including setting up a virtual device.

The installation process can take 30 minutes or more to complete.

### Verify 2

✏️ Start the virtual device you created in the setup.
✏️ Run the following commands in a terminal to verify React Native is installed correctly.

```shell
npx react-native@latest init AwesomeProject
cd AwesomeProject
npm start
```

Once the start command has finished, press `a` to start the Android app. It should open in your virtual device with the message "Welcome to React Native!".

We will be creating the real app in the next module, so you can delete your `AwesomeProject`.

## Next steps

Next, let’s [create a new app](./creating-a-new-app.html) to begin understand React Native’s structure and capabilities.
