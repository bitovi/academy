import "@testing-library/react-native/extend-expect"

import "react-native-gesture-handler/jestSetup"
import "@react-native-google-signin/google-signin/jest/build/setup"

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

jest.mock("@shared/services/pmo/api", () =>
  require("@shared/services/pmo/api/api.mock"),
)

jest.mock("@shared/services/storage", () =>
  require("@shared/services/storage/storage.mock"),
)

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

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
