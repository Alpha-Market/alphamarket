import antfu from "@antfu/eslint-config";

export default antfu({
	type: "app",
	typescript: true,
	formatters: true,
	react: true,
	jsonc: true,
	stylistic: {
		indent: "tab",
		semi: true,
		quotes: "double",
	},
	ignores: ["tailwind.config.ts"],
}, {
	rules: {
		"no-console": ["warn"],
		"unused-imports/no-unused-imports": ["warn"],
		"unused-imports/no-unused-vars": ["warn"],
		"node/prefer-global/process": ["off"],
		"ts/no-use-before-define": ["off"],
	},
});
