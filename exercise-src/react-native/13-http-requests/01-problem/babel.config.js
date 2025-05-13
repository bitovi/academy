module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "module:react-native-dotenv",
    [
      "module-resolver",
      {
        root: ["./"],
        extensions: [".js", ".jsx", ".tsx", ".ts", ".ios.js", ".android.js"],
        alias: {
          "@shared": "./src/shared",
        },
      },
    ],
  ],
}
