import { User as UserInfo } from "@react-native-google-signin/google-signin"
import { createContext, useContext } from "react"

export interface AuthContext {
  /** Initiate the Google Auth flow. Return boolean success. */
  signIn: () => Promise<UserInfo["user"] | false>

  /** Log the user out from Google Auth. Return boolean success. */
  signOut: () => Promise<boolean>

  /** Error if any Google API returns an error. Undefined if no errors in the last API call. */
  error?: Error | undefined

  /** Boolean if the user is authenticated or not. Undefined if unknown. */
  isAuthenticated?: boolean

  /** Boolean if a Google API call is being made. */
  isPending: boolean

  /** Google Auth User object. Undefined if not signed in. */
  user?: UserInfo["user"]

  /** List of Google Auth scopes. Undefined if not signed in. */
  scopes?: UserInfo["scopes"]

  /** Google Auth Token. Undefined if not signed in. */
  idToken?: UserInfo["idToken"]
}

const Context = createContext<AuthContext | undefined>(undefined)

export const AuthContextProvider = Context.Provider

export function useAuthContext(): AuthContext {
  const value = useContext(Context)

  if (!value) {
    throw new Error("Missing AuthProvider.")
  }

  return value
}
