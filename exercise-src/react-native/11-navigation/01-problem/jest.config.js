module.exports = {
  preset: "react-native",
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  transformIgnorePatterns: [
    "/node_modules/(?!((jest-)?react-native|@react-native(-community)?)|react-navigation|@react-navigation/.*)",
  ],
  moduleNameMapper: {
    "\\.(png)$": "identity-obj-proxy",
  },
}
