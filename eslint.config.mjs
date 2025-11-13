import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    files: [
      "**/*.ts"
    ]
  },
  {
    ignores: [
      "**/karma.conf.js"
    ]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': "warn",
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
];

