import "@testing-library/react-native/extend-expect"

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
