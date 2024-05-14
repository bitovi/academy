module.exports = {
  root: true,
  extends: "@bitovi/eslint-config/react",
  settings: {
    "import/ignore": ["node_modules/react-native/index\\.js$"],
  },
  rules: {
    "jest/prefer-hooks-in-order": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "no-type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
  },
}
