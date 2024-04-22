module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:jest-dom/recommended",
    "plugin:testing-library/react",
    "plugin:storybook/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "jsx-a11y", "react-hooks", "prettier", "@typescript-eslint"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-console": "warn",
    "no-use-before-define": ["error", "nofunc"],
    "@typescript-eslint/consistent-type-imports": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-imports.md#enforces-consistent-usage-of-type-imports-consistent-type-imports
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array",
      },
    ],
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/no-redeclare": "off", // Done because we want to allow using same names for type and const
    "@typescript-eslint/no-use-before-define": ["error", "nofunc"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/prop-types": "off",
    "testing-library/prefer-screen-queries": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
  },
  overrides: [
    {
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      files: ["./**/*.js"],
    },
    {
      files: ["tests/**/*"],
      env: {
        jest: true,
      },
    },
  ],
};
