module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended",
		"next/core-web-vitals",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
	rules: {
		indent: ["error", "tab"],
		semi: ["error", "always"],
		quotes: ["error", "double"],
		"no-console": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
		"react-hooks/exhaustive-deps": "off",
	},
	ignorePatterns: ["tailwind.config.ts"],
	settings: {
		react: {
			version: "detect",
		},
	},
};
