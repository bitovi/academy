@page learn-react-native/setting-up-your-environment Setting Up Your Environment
@parent learn-react-native 2

@description Learn how to set up a React Native environment on your computer.

@body

## How to follow this course

This course will walk you through building an application with React Native. Each page of the guide is based on building a new feature, and may have multiple “objectives” to complete. Each objective will be explained and include the requirements and any setup steps needed. Most objectives will also include unit tests to update to verify when you have implemented the solution correctly.

The ✏️ icon will be used to indicate when commands need to be run or when files need to be created or updated.

If you have any issues or suggestions as you move through this training, we’d love for you to submit a GitHub issue for it! 💖

## Overview

In this section, we will:

- Learn about Node.js
- Recommend tools to use in React development
- Setup emulators
- Generate a new React Native application
- Set up testing
- Verify that the new application can be served to the emulator and tested
-
## Objective 1: Install prerequisites

React Native works on a variety of platforms, but this training will only focus on Android. The Android platform is the easiest and most accessible platform, making it a good place to get started. The code across platforms will be mostly identical.

### Install a code editor

There are a variety of code editors that support React, the most popular is Microsoft’s [Visual Studio Code](https://code.visualstudio.com/). VS Code is available for most operating systems and has extensive support for React and JSX including: code completion, code highlighting, and linting. It’s also used by cloud environments like CodeSandbox and StackBlitz, making it easy to switch among different runtime environments.

We also recommend installing the following VS Code extensions to help you format your code consistently: 

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

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

During the installation process you may be prompted to make selections or install prerequisites, use
the default selections and proceed with the installation.

The installation process can take 10 to 15 minutes to complete.

### Verify 1

✏️ Run the following command in a terminal to verify Node.js is installed correctly.

🔦 _If you encounter an error running `node --version` you may need to restart for node to be
completely installed._

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

## Objective 3: Install Android development environment

Install Java Development Kit, Android Studio, Android SDK, and an Android emulator

Please follow the environment setup instructions for your operating system using the following links:

- [Windows](https://reactnative.dev/docs/environment-setup?os=windows&platform=android)
- [Mac](https://reactnative.dev/docs/environment-setup?os=macos&platform=android)
- [Linux](https://reactnative.dev/docs/environment-setup?os=linux&platform=android)

## Objective 4: Install Watchman and React Native

<!-- TODO -->

## Objective 5: Generate the “Place My Order” application

Create a new React Native application named “Place My Order” that supports TypeScript.


### Generate a new React Native application

```
npx react-native@latest init PlaceMyOrder
```

CocoaPods is an iOS specific set of dependencies. If you are on a Mac, you will see the prompt "Do you want to install CocoaPods now?" You can say no if you only want to focus on Android for now. You can always install pods later.

### Verify your application in the emulator

```
npm run android
```

### Verify your tests work

```
npm run test
```


## Next steps

Next, let’s learn about JSX to understand React’s templating language.