@page learn-ngrx/getting-started Getting Started
@parent learn-ngrx 2

@description Checkout the course repository and get setup for upcoming lessons!

@body

## Git Repository

For the sake of convenience, we've prepared a git repository for you to checkout as a starting point for the upcoming exercises. Each page in this training will contain a link to branches representing the starting point and solution for that part along with a link to a diff showing changes made.

## Setting up your Project

First, clone the `angular-ngrx-chat` repo using the git CLI by running the following in your terminal:

```bash
git clone https://github.com/bitovi/angular-ngrx-chat.git
```

Next, `cd` into the repo directory and checkout the `starting-point` branch.

```bash
cd angular-ngrx-chat
git checkout starting-point
```

Make sure to use the expected node/npm versions.

```
node -v # v14.20.0
npm -v # 6.14.13
```

If you have the wrong versions, I suggest using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (for mac) or [volta](https://docs.volta.sh/guide/getting-started) (for windows) for node version management.

Next install the project's node dependencies using `npm install`.

You now have the project starting point checked out, which includes:

1. An Angular 14 application
2. ESLint and the `@bitovi/eslint-config` package
3. Karma + Jasmine
4. Login and Dashboard UI Components
5. `TODO`'s for needed functionality
∂