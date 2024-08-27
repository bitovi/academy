module.exports = {
  root: true,
  extends: "@bitovi/eslint-config/react",
  settings: {
    "import/ignore": ["react-native/*"],
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "no-type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
  },
}
