import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import { Text } from "react-native"

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

const User: React.FC = () => {
  const context = useContext(Context)

  return (
    <Text>
      {context?.user ? `Welcome ${context.user.username}!` : "Please sign in."}
    </Text>
  )
}

export default App
