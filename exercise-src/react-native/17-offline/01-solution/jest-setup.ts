import "@testing-library/react-native/extend-expect"

import "react-native-gesture-handler/jestSetup"
import "@react-native-google-signin/google-signin/jest/build/setup"

import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock"

jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo)

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native")
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      setOptions: jest.fn(),
    }),
  }
})

jest.mock("./src/services/storage/storage", () =>
  require("./src/services/storage/storage.mock"),
)

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

const consoleError = console.error
console.error = (message, ...args) => {
  if (
    typeof message === "string" &&
    message.match(
      /Warning: An update to .+ inside a test was not wrapped in act\(\.\.\.\)\./,
    )
  ) {
    return
  }

  return consoleError(message, ...args)
}
