module.exports = {
  root: true,
  extends: "@bitovi/eslint-config/react",
  settings: {
    "import/ignore": ["node_modules/react-native/index\\.js$"],
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "no-type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],

    // off for examples
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/jsx-no-undef": "off",
    "no-console": "off",
    "no-debugger": "off",
    "no-warning-comments": "off",
  },
}
