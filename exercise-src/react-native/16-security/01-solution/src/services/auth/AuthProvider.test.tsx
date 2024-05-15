import { GoogleSigninButton } from "@react-native-google-signin/google-signin"
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react-native"
import { View, Text } from "react-native"

import Button from "../../design/Button"

import AuthProvider, {
  useAuthenticated,
  useAuthentication,
  useUser,
} from "./AuthProvider"

const oldFetch = global.fetch
const mockFetch = jest.fn()
beforeAll(() => {
  global.fetch = mockFetch
})
afterAll(() => {
  global.fetch = oldFetch
})

describe("Services/Auth/AuthProvider", () => {
  const TestComponent: React.FC = () => {
    const isAuthenticated = useAuthenticated()
    const { signIn, signOut } = useAuthentication()
    const user = useUser()

    return (
      <View>
        <Text>{user?.id}</Text>
        <Text>{user?.name}</Text>
        <Text>{user?.email}</Text>
        <Text>{user?.photo}</Text>
        <Text>{user?.givenName}</Text>
        <Text>{user?.familyName}</Text>
        {isAuthenticated && <Button onPress={signOut}>Sign Out</Button>}
        {isAuthenticated === false && <GoogleSigninButton onPress={signIn} />}
      </View>
    )
  }

  it("renders", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText(/mockId/i)).toBeOnTheScreen()
    })
  })

  it("signs in and signs out", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText(/mockId/i)).toBeOnTheScreen()
    })

    fireEvent.press(screen.getByText(/Sign Out/i))
    await waitFor(() => {
      expect(screen.getByText(/Mock Sign in with Google/i)).toBeOnTheScreen()
    })

    fireEvent.press(screen.getByText(/Mock Sign in with Google/i))
    await waitFor(() => {
      expect(screen.getByText(/Sign Out/i)).toBeOnTheScreen()
    })
  })
})
