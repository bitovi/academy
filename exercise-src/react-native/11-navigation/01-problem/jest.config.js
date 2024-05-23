module.exports = {
  clearMocks: true,
  moduleNameMapper: {
    "\\.(png)$": "identity-obj-proxy",
  },
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  transformIgnorePatterns: [
    "/node_modules/(?!((jest-)?react-native|@react-native(-community)?)|react-navigation|@react-navigation/.*)",
  ],
}
