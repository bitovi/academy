import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxa11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'
import jest from 'eslint-plugin-jest'
import pluginImport from 'eslint-plugin-import'
import testingLibrary from 'eslint-plugin-testing-library'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxa11y,
      'import': pluginImport,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "no-unused-vars": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          args: "none",
        },
      ],

      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-inferrable-types": "off",

      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/explicit-module-boundary-types": "error",

      "import/no-unresolved": "off",

      "@typescript-eslint/consistent-type-imports": "error",
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-absolute-path": "error",
      "import/no-useless-path-segments": "error",

      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "off",

      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-warning-comments": ["warn", { terms: ["todo"], location: "start" }],

      "react/no-unknown-property": "off",
      "react/prop-types": "off",
    },
  },
  {
    // update this to match your test files
    files: ['**/*.test.{ts,tsx}'],
    plugins: { jest, 'testing-library': testingLibrary },
    languageOptions: {
      globals: jest.environments.globals.globals,
    },
    rules: {
      "jest/consistent-test-it": "error",
      "jest/prefer-hooks-in-order": "error",
      "jest/prefer-hooks-on-top": "error",
      "testing-library/prefer-user-event": "error",
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
)
