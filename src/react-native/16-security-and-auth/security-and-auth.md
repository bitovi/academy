@page learn-react-native/security-and-auth Security and Authentication
@parent learn-react-native 16
@outline 3

@description Learn about OAuth, google-signin, and how to secure your React Native app.

@body

## Overview

In this section, you will:

- Learn about OAuth core concepts.
- Implement Google Sign-In in your React Native app.
- Be introduced to useCallback and useMemo.

## Objective 1: Context and Google Authentication

<img alt="Screenshot of the Settings tab with a Google sign in button" src="../static/img/react-native/16-security/1-solution.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

### OAuth

OAuth, or "Open Authorization", is a standard that allows an application to access resources hosted by another application through a secure authorization process.

The OAuth flow typically involves the following steps:

1. The user clicks a "Sign In" button in the application.
2. The application redirects the user to the OAuth provider's login page.
3. The user logs in to the OAuth provider.
4. The OAuth provider redirects the user back to the application with an authorization code.
5. The application exchanges the authorization code for an access token.
6. The application uses the access token to access the secured resources.

Let's break down some of the core concepts of OAuth:

- **Access Token**: A token used by the application to access protected resources. It is obtained during the OAuth authorization flow and sent with each request to the resource server. Access tokens are typically short-lived and can be refreshed using a refresh token.

- **Refresh Token**: A token used to obtain a new access token when the current access token expires. Refresh tokens are typically long-lived and can be used to obtain new access tokens without requiring the user to log in again.

- **Scopes**: Scopes are permissions requested by the application during the OAuth authorization flow. They define what actions the application is allowed to perform using the access token. For example, an application might request only read access to a user's Google Drive files, which would allow it to view but not modify the files.

- **Authorization Server**: The server that authenticates the user and issues access tokens.

- **Resource Server**: The server that hosts protected resources. It is responsible for validating access tokens and granting access to resources based on the token's permissions.


The use of refresh tokens rather than long-lived access tokens is primarily a security measure:

- **Reduced Exposure**: If an access token is compromised, the attacker has a limited window of time to use it before it expires.

- **Revocation**: If a user's access is revoked, the refresh token can be invalidated, preventing the attacker from obtaining new access tokens.

- **Limited Scope**: Refresh tokens can be issued with limited scopes, reducing the potential damage if they are compromised.

### GoogleSignin

The `@react-native-google-signin/google-signin` package provides a simple way to integrate Google Sign-In into our React Native apps. It handles the OAuth flow, allowing users to sign in with their Google accounts and obtain an access token that can be used to access Google services on their behalf.

Let's breakdown some of the methods provided by the package:

#### GoogleSignin.configure()

```tsx
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes,
  webClientId
});
```

It is mandatory to call the `configure` method before attempting to sign in. The `configure` method takes an object and is used to initialize your application for authentication with Google. The `scopes` parameter is an array of strings representing the permissions the application is requesting. The `webClientId` parameter is the client ID of th project that is created in the Google Cloud Console.

#### GoogleSignin.signIn

```tsx
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const signIn = async () => {
  try {
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
       // operation is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
    } else {
        // some other error happened
    }
  }
};
```

Ths `signIn` method is used to prompt a modal and allow the user to sign into their Google account from our application. This method returns a promise that resolves to the user's information if the sign-in is successful. This method is the first part of authorization OAuth flow. Once the user is signed in, we can use the `getTokens` method to retrieve an access token.

#### GoogleSignin.getCurrentUser

```tsx
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const getCurrentUser = async () => {
  const userInfo = await GoogleSignin.getCurrentUser();
  console.log(userInfo);
};
```

The `getCurrentUser` method is used to retrieve the current signed-in user's information. This method returns a promise that resolves to the user's information if the user is signed in.

#### GoogleSignin.signOut

```tsx
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const signOut = async () => {
  await GoogleSignin.signOut();
};
```

The `signOut` method is used to sign the current user out and revoke the access token.

#### GoogleSigninButton

```tsx
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

<GoogleSigninButton
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={signIn}
    disabled={false}
/>
```

The `GoogleSigninButton` component is a pre-styled button that can be used to initiate the sign-in flow. The size, color, and whether the button is disabled can be customized using props. The `onPress` prop is used to specify the function to be called when the button is pressed.

### useCallback

The `useCallback` Hook is used to memoize functions so that they are not recreated on every render. When using a provider, it is important to memoize functions so that they do not cause unnecessary re-renders of components that depend on them.

```tsx
const memoizedCallback = useCallback(() => {
  // function logic
}, [dependencies]);
```

In the example above, the `memoizedCallback` function will only be recreated when the `dependencies` array changes.

### useMemo

Similar to `useCallback`, the `useMemo` Hook is used to memoize values so that they are not recalculated on every render. It is useful for optimizing performance by avoiding unnecessary calculations.

The `useCallback` Hook is used to memoize a function, so that child components do not re-render when the function reference changes. The `useMemo` Hook on the other hand is used to memoize a _value_. We should use `useMemo` if the logic to calculate a value is expensive.

```tsx
const memoizedValue = useMemo(() => {
  // value calculation logic
}, [dependencies]);
```

Just like `useCallback`, the `memoizedValue` will only be recalculated when the `dependencies` array changes.

### AuthProvider

An `AuthProvider` is a React Context Provider that manages the authentication state of the application. It provides the authentication state and methods to sign in and sign out to the rest of the application using a React Context.

The `AuthProvider` typically includes the following components:

- **Sign In Method**: A method to sign in the user.
- **Sign Out Method**: A method to sign out the user.
- **Get User Method**: A method to retrieve the current signed-in user's information.

We can use an `AuthProvider` to lock down our application and only allow access to authenticated users.

```tsx
<AuthProvider>
  <App />
</AuthProvider>
```

```tsx
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = useCallback(() => {
    // sign in logic
  }, []);

  const signOut = useCallback(() => {
    // sign out logic
  }, []);

  if (!user) {
    return <SignInScreen onSignIn={signIn} />;
  }

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
```

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
