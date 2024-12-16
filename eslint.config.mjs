import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "app",
    typescript: true,
    formatters: true,
    react: true,
    jsonc: true,
    stylistic: {
      indent: "tab", // Tab indentation
      semi: true, // Enforce semicolons
      quotes: "double", // Use double quotes
    },
    ignores: ["tailwind.config.ts"], // Ignore specific file
  },
  {
    rules: {
      // Disable all ESLint rules
      "no-console": "off",
      "unused-imports/no-unused-imports": "off",
      "unused-imports/no-unused-vars": "off",
      "node/prefer-global/process": "off",
      "ts/no-use-before-define": "off",
      "react/prefer-destructuring-assignment": "off",
      "react-dom/no-missing-button-type": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-refresh/only-export-components": "off",
      "react/no-unstable-context-value": "off",
      "style/indent": "off",
      "style/multiline-ternary": "off",
      "react-hooks/rules-of-hooks": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-redeclare": "off",
      "no-magic-numbers": "off",
      "no-alert": "off",
      "no-debugger": "off",
      "react/jsx-key": "off",
      "react/jsx-no-undef": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "import/no-unresolved": "off",
      "import/named": "off",
      "import/default": "off",
      "import/no-absolute-path": "off",
      "import/no-dynamic-require": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "import/first": "off",
      "import/no-extraneous-dependencies": "off",
    },
  },
);
