import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  ...compat.extends(
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    ...compat.extends("plugin:@typescript-eslint/recommended"),
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
