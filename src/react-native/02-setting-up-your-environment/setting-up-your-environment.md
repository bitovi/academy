@page learn-react-native/setting-up-your-environment Setting Up Your Environment
@parent learn-react-native 2
@outline 3

@description Learn how to set up your environment for React Native development.

@body

## Overview

In this section, you will:

- Install a code editor.
- Install Node.js and npm.
- Install the JDK, Android Studio, and other React Native dependencies.

You must have one of these two operating systems:

- macOS 12 (Monterey) or newer
- Windows 10 (64-bit) or newer

There are several dependencies used to create, build, and deploy a React Native application, and the specifics vary based on your development OS (macOS, Windows, or Linux) and target OS (Android or iOS). Building for iOS require a macOS computer, so this course only focuses on building for Android, though most of the techniques apply to all targets. Expo Go is a very convenient way to build simple React Native apps, though we will be using the official React Native CLI for this course, due to Expo Go's limitations.

The setup steps below will walk you through installing these dependencies across both operating systems:

- Node 20 or newer
- npm 10 or newer
- JDK 17 or equivalent
- Android Studio
- Android SDK
- Android SDK Platform
- Android Virtual Device

Specific to macOS:

- Node Version Manager (nvm)
- Homebrew
- Watchman

Specific to Windows:

- NVM for Windows
- Chocolatey
- Performance (Intel ® HAXM or equivalent)

## Objective 1: Install a code editor

### Installing a code editor

There are a variety of code editors that support React, the most popular is Microsoft’s [Visual Studio Code](https://code.visualstudio.com/).
VS Code is available for most operating systems and has extensive support for React and JSX including: code completion, code highlighting, and linting.
It’s also used by cloud environments like CodeSandbox and StackBlitz, making it easy to switch among different runtime environments.

These VS Code extensions will help you format your code consistently:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## macOS

Follow the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup?guide=native&os=macos&platform=android) instructions for macOS.

Be sure to follow the quickstart instructions for:

- Watchman
- Java Development Kit
- Install Android Studio
- Install the Android SDK
- Configure the ANDROID_HOME environment variable

We will walk through these steps in detail in the sections below.

The installation process can take 30 minutes or more to complete.

### Objective 2: Install Node.js and npm

#### Install Node.js and npm

Our solution requires the [Node.js](https://nodejs.org/) JavaScript runtime environment. Node.js and its included package manager `npm` will be used to do a variety of tasks including: installing required packages, running the development server, executing tests, and building the application for deployment.

This course requires Node.js version 20.
We always suggest using the long-term support [release](https://nodejs.org/en/about/previous-releases).

#### Setup 2

✏️ Follow [npm’s instructions to install Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

We recommend [using nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) to install Node because it allows you to manage multiple versions of Node for different projects.

During the installation process, you may be prompted to make selections or install prerequisites.
Use the default selections and proceed with the installation.

The installation process can take 10 to 15 minutes to complete.

#### Verify 2

✏️ Run the following command in a terminal to verify Node.js is installed correctly.

```shell
node --version
```

The output of the command will be the current version of Node.js. It should start with "v20".

If you encounter an error running `node --version`, you may need to restart for Node to be completely installed.

✏️ Run the following command in a terminal to verify `npm` is installed correctly:

```shell
npm --version
```

The output of the command will be the current version of `npm`. It should start with "10".

### Objective 3: Install the Java Development Kit

Before installing the Java Development Kit (JDK), we will install Homebrew and Watchman.

#### Setup 3

##### Homebrew

✏️ Follow the “Install Homebrew” instructions on [Homebrew’s website](https://brew.sh).

After running the installer, be sure to follow the instructions it prints:

```
Warning: /opt/homebrew/bin is not in your PATH.
  Instructions on how to configure your shell for Homebrew
  can be found in the 'Next steps' section below.

==> Next steps:
- Run this command in your terminal to add Homebrew to your PATH:
    eval "$(/opt/homebrew/bin/brew shellenv)"
```
@highlight 6-7

##### Watchman

✏️ Use Homebrew to install Watchman:

```
brew install watchman
```

##### Java Development Kit

✏️ Install the Java Development Kit with these commands:

```
brew tap homebrew/cask-versions
brew install --cask zulu17

# Get path to where cask was installed to double-click installer
brew info --cask zulu17
```

> After you install the JDK, update your `JAVA_HOME` environment variable. If you used above steps, JDK will likely be at /Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home

#### Verify 3

✏️ Run the following command to verify the JDK is installed correctly:

```
java -version
```

The output of the command should be something like:

```
openjdk version "17.0.10" 2024-01-16 LTS
OpenJDK Runtime Environment Zulu17.48+15-CA (build 17.0.10+7-LTS)
OpenJDK 64-Bit Server VM Zulu17.48+15-CA (build 17.0.10+7-LTS, mixed mode, sharing)
```

The `openjdk version` should be major version `17` (and not higher).

### Objective 4: Install Android Studio

Follow the instructions in the quickstart guide.

### Objective 5: Install the Android SDK

Follow the instructions in the quickstart guide.

### Objective 6: Configure environment variables

#### Configure the ANDROID_HOME environment variable

Follow the instructions in the quickstart guide.

## Windows

Follow the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup?guide=native&os=windows&platform=android) instructions for your operating system.

Be sure to follow the quickstart instructions for:

- JDK
- Install Android Studio
- Install the Android SDK
- Configure the ANDROID_HOME environment variable
- Add platform-tools to Path

We will walk through these steps in detail in the sections below.

The installation process can take 30 minutes or more to complete.

### Objective 2: Install Node.js and npm

#### Node.js and npm

✏️ Follow [npm’s instructions to install Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

We recommend [using NVM for Windows](https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#overview)
to install Node because it allows you to manage multiple versions of Node for different projects.

You can also follow [Microsoft’s instructions for setting up Node.js on Windows](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).

For some of the instructions, you may need to [open the command prompt or PowerShell as an administrator](https://www.howtogeek.com/194041/how-to-open-the-command-prompt-as-administrator-in-windows-10/).

### Objective 3: Install the Java Development Kit

#### Setup 3

##### Chocolatey

✏️ [Install Chocolatey](https://chocolatey.org/install) before installing the JDK.

##### JDK

✏️ Follow the instructions in the quickstart guide.

#### Verify 3

##### Chocolatey

✏️ Run the following command in Powershell to verify Chocolatey is installed correctly:

```
choco
```

The output of the command should be something like:

```
Chocolatey v2.2.2
Please run 'choco -?' or 'choco <command> -?' for help menu.
```

##### JDK

✏️ Run the following command in Powershell to verify the version of Java installed:

```
java -version
```

The output of the command should be something like:

```
openjdk version "17.0.10" 2024-01-16 LTS
OpenJDK Runtime Environment Microsoft-8902769 (build 17.0.10+7-LTS)
OpenJDK 64-Bit Server VM Microsoft-8902769 (build 17.0.10+7-LTS, mixed mode, sharing)
```

The `openjdk version` should be major version `17` (and not higher).

✏️ Run the following command in Powershell to verify Java is installed correctly:

```
(Get-ChildItem Env:PATH).Value -split ';' | Where-Object { $_ -like '*jdk*' }
```

The output of the command should be something like:

```
C:\Program Files\Microsoft\jdk-17.0.10.7-hotspot\bin
```

✏️ Run the following command in Powershell to verify that `JAVA_HOME` is configured correctly:

```
Get-ChildItem Env:JAVA_HOME
```

The output of the command should be something like:

```
Name                           Value
----                           -----
JAVA_HOME                      C:\Program Files\Microsoft\jdk-17.0.10.7-hotspot\
```

### Objective 4: Install Android Studio

#### Install Android Studio

#### Setup 4

✏️ Follow the instructions in the quickstart guide.

#### Verify 4

✏️ Run the following command in Powershell to verify that `ANDROID_SDK_ROOT` is configured correctly:

```
Get-ChildItem Env:ANDROID_SDK_ROOT
```

### Objective 5: Install the Android SDK

#### Install the Android SDK

#### Setup 5

✏️ Follow the instructions in the quickstart guide.

Be sure to follow each step:

1. Open Android Studio.
2. Click the “More Actions” button.
3. Select “SDK Manager” from the dropdown.
4. Select the “SDK Platforms” tab.
5. Check the “Show Package Details” checkbox in the bottom right.
6. Expand the “Android 14 (UpsideDownCake)” entry.
7. Make sure “Android SDK Platform 34” is selected.
8. Select “Intel x86 Atom_64 System Image” or “Google APIs Intel x86 Atom System Image”.
9. Select the “SDK Tools” tab.
10. Check the “Show Package Details” checkbox in the bottom right.
11. Expand the “Android SDK Build-Tools” entry.
12. Make sure “34.0.0” is selected.
13. Click “Apply” to install the SDKs.

### Objective 6: Configure environment variables

#### Configure the ANDROID_HOME environment variable

#### Setup 6

✏️ Follow the instructions in the quickstart guide to:

- Configure the ANDROID_HOME environment variable.
- Add platform-tools to Path.

#### Verify 6

✏️ Run the following command in Powershell to verify that `ANDROID_HOME` is configured correctly:

```
Get-ChildItem Env:ANDROID_HOME
```

The output of the command should be something like:

```
Name                           Value
----                           -----
ANDROID_HOME                   C:\Users\bitovi\AppData\Local\Android\Sdk
```

✏️ Run the following command in Powershell to verify that `platform-tools` is installed correctly:

```
(Get-ChildItem Env:PATH).Value -split ';' | Where-Object { $_ -like '*platform-tools*' }
```

The output of the command should be something like:

```
C:\Users\bitovi\AppData\Local\Android\Sdk\platform-tools
```

## Next steps

Next, let’s [create a new app](./creating-a-new-app.html) to begin understand React Native’s structure and capabilities.
