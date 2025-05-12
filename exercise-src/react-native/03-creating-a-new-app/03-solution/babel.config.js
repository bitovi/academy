module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    "module-resolver", {
      root: ['./'],
      extensions: [".js", ".jsx", ".tsx", ".ios.js", ".android.js"],
      alias: {
        "@shared": ["./src/shared"]
      }
  }],
};
