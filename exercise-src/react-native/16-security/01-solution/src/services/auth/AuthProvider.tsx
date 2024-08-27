import {
  User as UserInfo,
  GoogleSignin,
} from "@react-native-google-signin/google-signin"
import { useCallback, useEffect, useMemo, useState } from "react"

import { AuthContext, AuthContextProvider, useAuthContext } from "./context"

const googleOauthwebClientId = process.env.GOOGLE_OAUTH_CLIENT_ID

GoogleSignin.configure({
  scopes: ["openid", "profile", "email"],
  webClientId: googleOauthwebClientId,
})

export interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [error, setError] = useState<Error | undefined>()
  const [isPending, setIsPending] = useState<boolean>(true)
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>()

  const signIn = useCallback(async () => {
    try {
      setError(undefined)
      setIsPending(true)

      const userInfo = await GoogleSignin.signIn()

      setIsPending(false)
      setUserInfo(userInfo)

      return userInfo.user
    } catch (error) {
      console.error("Call to GoogleSignin.signIn() failed with error:", error)

      setError(error as Error)
      setIsPending(false)
      setUserInfo(undefined)

      return false
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      setError(undefined)
      setIsPending(true)

      await GoogleSignin.signOut()

      setIsPending(false)
      setUserInfo(undefined)

      return true
    } catch (error) {
      console.error("Call to GoogleSignin.signOut() failed with error:", error)

      setError(error as Error)
      setIsPending(false)

      return false
    }
  }, [])

  useEffect(() => {
    async function run() {
      try {
        setError(undefined)
        setIsPending(true)

        const userInfo = await GoogleSignin.getCurrentUser()

        setIsPending(false)
        setUserInfo(userInfo || undefined)
      } catch (error) {
        console.error(
          "Call to GoogleSignin.getCurrentUser() failed with error:",
          error,
        )

        setError(error as Error)
        setIsPending(false)
      }
    }

    run()
  }, [])

  const value = useMemo<AuthContext>(
    () => ({
      signIn,
      signOut,
      error,
      isAuthenticated: userInfo
        ? true
        : userInfo === undefined
        ? false
        : undefined,
      isPending,
      user: userInfo?.user,
      scopes: userInfo?.scopes,
      idToken: userInfo?.idToken,
    }),
    [error, isPending, signIn, signOut, userInfo],
  )

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>
}

export default AuthProvider

export function useAuthentication(): Pick<
  AuthContext,
  "error" | "isPending" | "signIn" | "signOut"
> {
  const { error, isPending, signIn, signOut } = useAuthContext()

  return { error, isPending, signIn, signOut }
}

export function useAuthenticated(): boolean | undefined {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated
}

export function useUser(): UserInfo["user"] | undefined {
  const { user } = useAuthContext()

  return user
}
