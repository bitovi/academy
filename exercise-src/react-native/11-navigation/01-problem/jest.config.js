module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  clearMocks: true,
  moduleNameMapper: {
    "\\.(png)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!((jest-)?react-native|@react-native(-community)?)|react-navigation|@react-navigation/.*)",
  ],
}
