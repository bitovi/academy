@page angular/deploy-app Deploy App
@parent angular 17

@description Deploying App 
@body

## Overview

In this part, we will:

- Create a Firebase account
- Create a new project in Firebase
- Install Firebase cli tools
- Link our Place My Order app to the Firebase app
- Deploy app to Firebase
- Update npm script to include deploy

## Create Firebase account

Go to <a href="https://console.firebase.google.com" target="_blank">https://console.firebase.google.com</a> and sign in or create new account.

## Create new project

Create a new project called `place my order` in the Firebase console.

## Install Firebase CLI

```shell
npm install -g firebase-tools
```

Now, log into firebase. 

```shell
firebase login
```

This will launch a page in your browser asking you to authenticate.

## Link Place My Order app to new Firebase app

```shell
firebase init
```

1. Which Firebase CLI features do you want to setup for this folder? (hosting)
2. Select a default Firebase project for this directory? (don't setup a default project)
3. What do you want to use as your public directory? (dist/place-my-order)
4. Configure as a single-page app (rewrite all urls to /index.html)? (yes)


```shell
firebase use --add
```

1. Which project do you want to add? (select your place-my-order project)
2. What alias do you want to use for this project? (prod)

## Deploy App

We need to get our app ready to deploy, so we'll create a build with the production flag.  

```shell
ng build --production
```

```shell
firebase deploy
firebase open hosting:site
```

Now when we view our project url from the page Firebase launches we'll see our app!

## Update npm scrips

```json
 "scripts": {
    "ng": "ng",
    "start": "ng serve --proxy-config proxy.conf.json",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "api": "place-my-order-api --port 7070",
    "deploy": "ng build --prod && firebase deploy"
  },
  ```

