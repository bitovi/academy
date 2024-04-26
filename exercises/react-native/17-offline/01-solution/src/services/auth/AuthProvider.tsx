import type { FC, ReactNode } from "react"
import type { User as UserInfo } from "@react-native-google-signin/google-signin"
import type { AuthContext } from "./context"

import { useCallback, useEffect, useMemo, useState } from "react"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

import { AuthContextProvider, useAuthContext } from "./context"

const googleOauthwebClientId = process.env.GOOGLE_OAUTH_CLIENT_ID
GoogleSignin.configure({
  scopes: ["openid", "profile", "email"],
  webClientId: googleOauthwebClientId,
})

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>()

  const signIn = useCallback(async () => {
    try {
      const userInfo = await GoogleSignin.signIn()
      setUserInfo(userInfo)
      return userInfo.user
    } catch (error) {
      setUserInfo(null)
      console.error("GoogleSignin.signIn() error", error)
      return false
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      await GoogleSignin.signOut()
      setUserInfo(null)
      return true
    } catch (error) {
      console.error("GoogleSignin.signOut() error", error)
      return false
    }
  }, [])

  useEffect(() => {
    async function run() {
      const userInfo = await GoogleSignin.getCurrentUser()
      setUserInfo(userInfo)
    }

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
