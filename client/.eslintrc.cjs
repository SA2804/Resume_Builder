module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  plugins: ["react-refresh", "react", "react-hooks", "jsx-a11y"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react/prop-types": ["error"],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
