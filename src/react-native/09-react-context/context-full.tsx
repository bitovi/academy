import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

interface User {
  username: string
  token: string
}

interface AuthContext {
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  user?: User
}

const Context = createContext<AuthContext | undefined>(undefined)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>()

  const signIn = useCallback(async (username: string, password: string) => {
    setUser({ username, token: password })
  }, [])

  const signOut = useCallback(async () => {
    setUser(undefined)
  }, [])

  const value = useMemo(
    () => ({
      signIn,
      signOut,
      user,
    }),
    [user],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default AuthProvider

export function useUser() {
  const { user } = useContext(Context)

  return user
}

export function useAuthentication() {
  const { signIn, signOut } = useContext(Context)

  return { signIn, signOut }
}
