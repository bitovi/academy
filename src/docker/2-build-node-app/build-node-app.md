@page learn-docker/build-node-app Build a Node App
@parent learn-docker 2

@description Build a simple Express API to use for the rest of the course.

@body

<iframe width="560" height="315" src="https://www.youtube.com/embed/6sHuGWj5cGM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Overview
In this section, we are going to build a simple "Hello World" api using [Express](https://expressjs.com/).

NodeJS is not required if you just want to read through this section and copy/paste the code snippets. If you want to run the application before we containerize it in the next section, you can install NodeJS [here](https://nodejs.org/en/download/).
                  
## Building our app
The app requires only two files
* `package.json`
* `src/index.js`

### package.json
```json
{
  "name": "bitovi-academy-app",
  "version": "1.0.0",
  "scripts": {
   "start": "nodemon src/index.js",
   "start:prod": "node src/index.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.6"
  }
}
```
This file defines `express` as a standard dependency and `nodemon` as a dev dependency. Nodemon is used to run our Express server and watches the source code to hot-reload any new changes without needing to restart the server. It is a dev dependency because we don't want the overhead of running nodemon in production or even the bulk of keeping it in `node_modules/`.

Our `package.json` also defines a `start` script and a `start:prod`. These are convenient ways to allow us to start our application with nodemon or node by running `npm start` or `npm run start:prod`.

### src/index.js
```js
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```
This file starts an express server listening on `localhost:3000`. If we access the root path it should return `Hello World!`. The default port is 3000, but can be overwritten by setting the `PORT` environment variable before starting the server.

## Run our app
This step is optional, but to verify our app works you can run
```bash
npm install
npm start
```
Open your browser to `localhost:3000` and you should see `Hello World!`

![node app in browser](../static/img/docker/2-build-node-app/node-hello-world.png)

## What's next
Now that we've created a simple NodeJS app, we are going to containerize it.
    