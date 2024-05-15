@page learn-react-native/security-and-auth Security and Authentication
@parent learn-react-native 16
@outline 3

@description TODO

@body

## Overview

In this section, you will:

- TODO

## Objective 1: Context and Google Authentication

TODO

### Concept TODO

TODO

### Setup 1

✏️ Run:

```bash
npm install @react-native-google-signin/google-signin@11
```

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/15-async-storage/02-solution/src/App.tsx ../../../exercises/react-native/16-security/01-problem/src/App.tsx only

✏️ Update **src/env.d.ts** to be:

@diff ../../../exercises/react-native/15-async-storage/02-solution/src/env.d.ts ../../../exercises/react-native/16-security/01-problem/src/env.d.ts only

✏️ Update **.env** to be:

@diff ../../../exercises/react-native/15-async-storage/02-solution/.env.example ../../../exercises/react-native/16-security/01-problem/.env.example only

✏️ Update your `GOOGLE_OAUTH_CLIENT_ID` with your key.

✏️ Update **src/screens/Settings/Settings.tsx** to be:

@diff ../../../exercises/react-native/15-async-storage/02-solution/src/screens/Settings/Settings.tsx ../../../exercises/react-native/16-security/01-problem/src/screens/Settings/Settings.tsx only

✏️ Create **src/services/auth/AuthProvider.tsx** and update it to be:

@sourceref ../../../exercises/react-native/16-security/01-problem/src/services/auth/AuthProvider.tsx

✏️ Create **src/services/auth/context.ts** and update it to be:

@sourceref ../../../exercises/react-native/16-security/01-problem/src/services/auth/context.ts

✏️ Create **src/services/auth/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/16-security/01-problem/src/services/auth/index.ts

### Verify 1

✏️ Update **src/screens/Settings/Settings.test.tsx** to be:

@diff ../../../exercises/react-native/15-async-storage/02-solution/src/screens/Settings/Settings.test.tsx ../../../exercises/react-native/16-security/01-problem/src/screens/Settings/Settings.test.tsx only

✏️ Create **src/services/auth/AuthProvider.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/16-security/01-problem/src/services/auth/AuthProvider.test.tsx

### Exercise 1

First, we need to finish implementing the `AuthContext` in `AuthProvider`:

- Implement `signIn` and `signOut` using `useCallback`.
- When a sign in is successful, update the `user`.

Next, in `App.js`

- Add the `AuthProvider` to the `App` component.

Finally, in `Settings.js`:

- Use the hooks from `AuthContext` to grab the `user` state, and `signIn` and `signOut` callbacks.
- Implement a conditional to render the a button to Sign In or Sign Out based on the user's state.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/16-security/01-problem/src/App.tsx ../../../exercises/react-native/16-security/01-solution/src/App.tsx only

✏️ Update **src/screens/Settings/Settings.tsx** to be:

@diff ../../../exercises/react-native/16-security/01-problem/src/screens/Settings/Settings.tsx ../../../exercises/react-native/16-security/01-solution/src/screens/Settings/Settings.tsx only

✏️ Update **src/services/auth/AuthProvider.tsx** to be:

@diff ../../../exercises/react-native/16-security/01-problem/src/services/auth/AuthProvider.tsx ../../../exercises/react-native/16-security/01-solution/src/services/auth/AuthProvider.tsx only

</details>

## Next steps

Next, with some of the new tricks we've learned we'll also add [Offline Support](./offline-support) so our app is still usable during network outages.
