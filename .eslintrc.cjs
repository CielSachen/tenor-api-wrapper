// @ts-check

/** @type {import('@typescript-eslint/utils/ts-eslint').ClassicConfig.Config} */
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:jsdoc/recommended-typescript-flavor",
    "prettier",
  ],
  ignorePatterns: "dist/**/*",
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:import/typescript",
        "plugin:jsdoc/recommended-typescript",
      ],
      files: ["**/*.ts", "**/*.cts", "**/*.mts"],
      parser: "@typescript-eslint/parser",
      parserOptions: { project: true, tsconfigRootDir: __dirname },
      plugins: ["@typescript-eslint"],
      rules: {
        "no-shadow": "off",
        "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true }],
        "@typescript-eslint/no-shadow": "error",
        "jsdoc/require-jsdoc": [
          "warn",
          {
            publicOnly: true,
            require: {
              ArrowFunctionExpression: true,
              ClassDeclaration: true,
              ClassExpression: true,
              FunctionDeclaration: true,
              FunctionExpression: true,
              MethodDefinition: true,
            },
            contexts: [
              "PropertyDefinition",
              "TSEnumDeclaration",
              "TSInterfaceDeclaration",
              "TSMethodSignature",
              "TSModuleDeclaration",
              "TSPropertySignature",
              "TSTypeAliasDeclaration",
            ],
          },
        ],
      },
      settings: { "import/resolver": { typescript: true, node: true } },
    },
  ],
  parserOptions: {
    ecmaFeatures: { impliedStrict: true },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["import", "jsdoc", "simple-import-sort"],
  root: true,
  rules: {
    curly: ["error", "multi", "consistent"],
    "max-nested-callbacks": ["error", { max: 4 }],
    "no-console": "off",
    "no-empty-function": "error",
    "no-inline-comments": "error",
    "no-lonely-if": "error",
    "no-shadow": "error",
    "no-var": "error",
    "prefer-const": "error",
    yoda: "error",
    "jsdoc/require-jsdoc": [
      "warn",
      {
        publicOnly: true,
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
        contexts: ["PropertyDefinition"],
      },
    ],
    "simple-import-sort/exports": "warn",
    "simple-import-sort/imports": "warn",
  },
};
