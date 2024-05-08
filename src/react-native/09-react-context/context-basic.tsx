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

const App: React.FC = () => {
  const [user, setUser] = useState<User>()

  const signIn = useCallback(async (username: string, password: string) => {
    setUser({ username, token: password })
  }, [])

  const signOut = useCallback(async () => {
    setUser(undefined)
  }, [])

  const value = useMemo(
    () => ({ signIn, signOut, user }),
    [signIn, signOut, user],
  )

  return (
    <Context.Provider value={value}>
      <User />
    </Context.Provider>
  )
}

const User: React.FC = ({ children }) => {
  const context = useContext(Context)

  return (
    <div>
      {context?.user ? `Welcome ${context.user.username}!` : "Please sign in."}
    </div>
  )
}
