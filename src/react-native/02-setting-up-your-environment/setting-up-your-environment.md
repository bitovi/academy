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
- Launch the Android emulator.

## Objective 1: Install a code editor

### Installing a code editor

There are a variety of code editors that support React, the most popular is Microsoft’s [Visual Studio Code](https://code.visualstudio.com/).
VS Code is available for most operating systems and has extensive support for React and JSX including: code completion, code highlighting, and linting.
It’s also used by cloud environments like CodeSandbox and StackBlitz, making it easy to switch among different runtime environments.

These VS Code extensions will help you format your code consistently:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Set up the React Native CLI

There are multiple ways to develop React Native applications, including Expo Go and the React Native CLI.

We recommend using the [React Native CLI](https://reactnative.dev/docs/environment-setup?guide=native) because Expo Go has limitations that might cause you to rearchitect your application as soon as you run into them.
For example, this course implements [authentication](./security-and-auth.html) that requires a native dependency that cannot be used in Expo Go.

You must have one of these two operating systems:

- macOS 12 (Monterey) or newer
- Windows 10 (64-bit) or newer

There are several dependencies used to create, build, and deploy a React Native application, and the specifics vary based on your development OS (macOS, Windows, or Linux) and target OS (Android or iOS).
Building for iOS require a macOS computer, so this course only focuses on building for Android, though most of the techniques apply to all targets.

Follow the instructions below for:

- [macOS](#macos)
- [Windows](#windows)

**Note:** The download and installation process can take a couple hours to complete.

## macOS

> **Using Windows?** [Skip to the Windows setup instructions.](#windows)

Follow the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup?guide=native&os=macos&platform=android) instructions for macOS.

Be sure to follow the quickstart instructions for:

- Watchman
- Java Development Kit
- Install Android Studio
- Install the Android SDK
- Configure the ANDROID_HOME environment variable

We will walk through these steps in detail in the sections below.

### Objective 2: Install Node.js and npm

#### Install Node.js and npm

Node.js is the JavaScript runtime that uses Chrome’s V8 engine to execute JavaScript code outside of a web browser.
In React Native projects, it is essential for running the development server, bundling the application, and executing JavaScript during both development and build processes.

npm (node package manager) accompanies Node.js as the tool for managing libraries and project dependencies.
Within React Native projects, npm is utilized to install and manage third-party packages.
It also ensures that these packages and their dependencies maintain compatibility and functionality across different development environments.

This course requires Node.js version 20, which includes npm 10.

#### Setup 2

✏️ Follow [npm’s instructions to install Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

We recommend [using nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) to install Node because it allows you to manage multiple versions of Node for different projects.

During the installation process, you may be prompted to make selections or install prerequisites.
Use the default selections and proceed with the installation.

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

### Objective 4: Install the Android SDK

Follow the instructions in the quickstart guide.

#### Install the Android SDK

Follow the instructions in the quickstart guide.

### Objective 5: Configure environment variables

#### Configure the ANDROID_HOME environment variable

Follow the instructions in the quickstart guide.

### Objective 6: Launch the Android emulator

<img alt="Screenshot of the Android Emulator running in Android Studio" src="../static/img/react-native/02-setting-up-your-environment/06-solution.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

#### Setup 6

✏️ Follow the instructions in the quickstart guide to:

1. See the list of available Android Virtual Devices (AVDs) by opening the “AVD Manager” from within Android Studio.
2. Click on the green triangle button next to your AVD to launch it.

If you have recently installed Android Studio, you will likely need to create a new AVD:

1. Select “Create Virtual Device…”
2. Pick any Phone from the list.
3. Click “Next”.
4. Select the UpsideDownCake API Level 34 image.
5. Click “Next” then “Finish” to create your AVD.

At this point you should be able to click on the green triangle button next to your AVD to launch it.

## Windows

> **Using macOS?** [Skip to the macOS setup instructions.](#macos)

We will follow the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup?guide=native&os=windows&platform=android) instructions for buliding Android apps on Windows.

After following the objectives below, you will:

- Install Node.js and npm.
- Install the Java Development Kit.
- Install Android Studio.
- Install the Android SDK.
- Configure the `ANDROID_HOME` environment variable.
- Add `platform-tools` to Path.

### Objective 2: Install Node.js and npm

#### Node.js and npm

Node.js is the JavaScript runtime that uses Chrome’s V8 engine to execute JavaScript code outside of a web browser.
In React Native projects, it is essential for running the development server, bundling the application, and executing JavaScript during both development and build processes.

npm (node package manager) accompanies Node.js as the tool for managing libraries and project dependencies.
Within React Native projects, npm is utilized to install and manage third-party packages.
It also ensures that these packages and their dependencies maintain compatibility and functionality across different development environments.

This course requires Node.js version 20, which includes npm 10.

We recommend [using NVM for Windows](https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#overview)
to install Node because it allows you to manage multiple versions of Node for different projects.

#### Setup 2

These instructions will use NVM for Windows to install Node.js and npm. This is our recommended approach.

If for some reason you cannot use NVM for Windows, you can follow [npm’s instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [Microsoft’s instructions](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).

✏️ [Install NVM for Windows](https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#install-nvm-windows).

Download the latest `nvm-setup.exe` file from the [releases page](https://github.com/coreybutler/nvm-windows/releases).

After installing NVM for Windows, open a new PowerShell window with administrator permissions.

✏️ Run the following command in PowerShell to install Node 20:

```
nvm install 20
```

Always [open PowerShell as an administrator](https://www.howtogeek.com/194041/how-to-open-the-command-prompt-as-administrator-in-windows-10/).

✏️ Run the following command in PowerShell to use the version of Node that you just installed:

```
nvm use 20
```

#### Verify 2

✏️ If you installed NVM for Windows, run the following command in PowerShell to verify it’s installed correctly:

```
nvm --version
```

The output of the command will be the current version of NVM for Windows. It should be `1.1.12` or higher.

✏️ Run the following command in a terminal to verify Node.js is installed correctly.

```shell
node --version
```

The output of the command will be the current version of Node.js. It should start with `v20`.

✏️ Run the following command in a terminal to verify `npm` is installed correctly:

```shell
npm --version
```

The output of the command will be the current version of `npm`. It should start with `10`.

### Objective 3: Install the Java Development Kit

#### Setup 3

##### Chocolatey

[Install Chocolatey](https://chocolatey.org/install) before installing the JDK.

✏️ Run the following command in PowerShell to check the current execution policy:

```
Get-ExecutionPolicy
```

If it’s set to `Restricted`, run the following:

```
Set-ExecutionPolicy AllSigned
```

Be sure to select `[A]` for all.

```
[A] Yes to All
```

Afterwards, when you run `Get-ExecutionPolicy` again, you should get:

```
AllSigned
```

✏️ Next, download and install Chocolatey:

```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

##### JDK

✏️ Close PowerShell and open it again.

This is required before installing the JDK.

✏️ Run the following command in PowerShell to install JDK 17 with Chocolatey:

```
choco install -y microsoft-openjdk17
```

#### Verify 3

✏️ Run the following command in PowerShell to verify Chocolatey is installed correctly:

```
choco
```

The output of the command should be something like:

```
Chocolatey v2.2.2
Please run 'choco -?' or 'choco <command> -?' for help menu.
```

✏️ Run the following command in PowerShell to verify the version of Java installed:

```
java -version
```

The output of the command should be something like:

```
openjdk version "17.0.11" 2024-04-16 LTS
OpenJDK Runtime Environment Microsoft-9388408 (build 17.0.11+9-LTS)
OpenJDK 64-Bit Server VM Microsoft-9388408 (build 17.0.11+9-LTS, mixed mode, sharing)
```

The `openjdk version` should be major version `17` (and not higher).

✏️ Run the following command in PowerShell to verify Java is installed correctly:

```
(Get-ChildItem Env:PATH).Value -split ';' | Where-Object { $_ -like '*jdk*' }
```

The output of the command should be something like:

```
C:\Program Files\Microsoft\jdk-17.0.11.9-hotspot\bin
```

✏️ Run the following command in PowerShell to verify that `JAVA_HOME` is configured correctly:

```
Get-ChildItem Env:JAVA_HOME
```

The output of the command should be something like:

```
Name                           Value
----                           -----
JAVA_HOME                      C:\Program Files\Microsoft\jdk-17.0.11.9-hotspot\
```

### Objective 4: Install the Android SDK

#### Install Android Studio

Android Studio is the official integrated development environment (IDE) for Android app development.
It provides the necessary tools to write your app code, design interfaces, and test your apps across a variety of Android devices.

You will need Android Studio to launch the Android emulator.
While we recommend using a different [code editor](#objective-1-install-a-code-editor) for day-to-day React Native development, you may choose to use Android Studio to write code instead.

#### Install the Android SDK

The Android SDK is a collection of software tools that you need to develop apps for Android devices.
It includes libraries, a debugger, an emulator, documentation, sample code, and tutorials.
The SDK integrates with Android Studio and provides you with APIs and tools that are necessary to develop applications that perform well on the Android platform.
These tools help you access device features like the camera and GPS, handle user input, and manage network operations.

#### Setup 4

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

### Objective 5: Configure environment variables

#### Configure the ANDROID_HOME environment variable

#### Setup 5

✏️ Follow the instructions in the quickstart guide to:

- Configure the ANDROID_HOME environment variable.
- Add platform-tools to Path.

#### Verify 5

✏️ Run the following command in PowerShell to verify that `ANDROID_HOME` is configured correctly:

```
Get-ChildItem Env:ANDROID_HOME
```

The output of the command should be something like:

```
Name                           Value
----                           -----
ANDROID_HOME                   C:\Users\bitovi\AppData\Local\Android\Sdk
```

✏️ Run the following command in PowerShell to verify that `platform-tools` is installed correctly:

```
(Get-ChildItem Env:PATH).Value -split ';' | Where-Object { $_ -like '*platform-tools*' }
```

The output of the command should be something like:

```
C:\Users\bitovi\AppData\Local\Android\Sdk\platform-tools
```

### Objective 6: Launch the Android emulator

<img alt="Screenshot of the Android Emulator running in Android Studio" src="../static/img/react-native/02-setting-up-your-environment/06-solution.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

#### Setup 6

✏️ Follow the instructions in the quickstart guide to:

1. See the list of available Android Virtual Devices (AVDs) by opening the “AVD Manager” from within Android Studio.
2. Click on the green triangle button next to your AVD to launch it.

If you have recently installed Android Studio, you will likely need to create a new AVD:

1. Select “Create Virtual Device…”
2. Pick any Phone from the list.
3. Click “Next”.
4. Select the UpsideDownCake API Level 34 image.
5. Click “Next” then “Finish” to create your AVD.

At this point you should be able to click on the green triangle button next to your AVD to launch it.

> If you don’t have HAXM installed, click on “Install HAXM” or follow [Intel’s instructions](https://github.com/intel/haxm/wiki/Installation-Instructions-on-Windows) to set it up, then go back to the AVD Manager.

## Next steps

Next, let’s [create a new app](./creating-a-new-app.html) to begin understand React Native’s structure and capabilities.
