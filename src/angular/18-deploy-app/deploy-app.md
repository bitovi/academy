@page learn-angular/deploy-app Deploy App
@parent learn-angular 18

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

## Add Production API URL

For our production app, we won't be running a local server, instead we'll point to `https://www.place-my-order.com/api`. All we need to do is add the apiUrl variable to our production environment file. When we do a production build by running `ng build --prod`, our production file will be used.

✏️ Update __src/environments/environment.production.ts__:

@sourceref ./environment.prod.ts

## Create Firebase account

Go to <a href="https://console.firebase.google.com" target="\_blank">https://console.firebase.google.com</a> and sign in or create new account.

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
ng build --prod
```

```shell
firebase deploy
firebase open hosting:site
```

Now when we view our project url from the page Firebase launches we'll see our app!

## Update npm scripts

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

## Survey

Thanks for taking this Bitovi training! We are constantly looking to improve this
course.  Please fill out the following survey and we will send you a t-shirt!



<iframe src="https://docs.google.com/forms/d/e/1FAIpQLScIukb7B5Q3d0I9xRge8_VDmQS9gNJqhJmjcJb_5aAKFMqFmA/viewform?embedded=true" width="640" height="1900" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
