import {
  User as UserInfo,
  GoogleSignin,
} from "@react-native-google-signin/google-signin"
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react"

import { AuthContext, AuthContextProvider, useAuthContext } from "./context"

const googleOauthwebClientId = process.env.GOOGLE_OAUTH_CLIENT_ID

GoogleSignin.configure({
  scopes: ["openid", "profile", "email"],
  webClientId: googleOauthwebClientId,
})

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>()

  // Exercise: Implement `signIn` and `signOut` using `useCallback`.

  useEffect(() => {
    // Exercise: When a sign in is successful, update the user.
    async function run() {}

    run()
  }, [])

  const value = useMemo<AuthContext>(
    () => ({
      signIn,
      signOut,
      isAuthenticated: userInfo ? true : userInfo === null ? false : undefined,
      user: userInfo?.user,
      scopes: userInfo?.scopes,
      idToken: userInfo?.idToken,
    }),
    [signIn, signOut, userInfo],
  )

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>
}

export default AuthProvider

export function useAuthentication(): Pick<AuthContext, "signIn" | "signOut"> {
  const { signIn, signOut } = useAuthContext()

  return { signIn, signOut }
}

export function useAuthenticated(): boolean | undefined {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated
}

export function useUser(): UserInfo["user"] | undefined {
  const { user } = useAuthContext()

  return user
}
