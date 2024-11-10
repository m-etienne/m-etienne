const { typescript } = require("svelte-preprocess");

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:svelte/recommended', 'prettier'],
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [
		{ 
			files: ['*.svelte'], 
			parser: 'svelte-eslint-parser',
			parserOptions: { parser: {ts:'@typescript-eslint/parser', js: 'espree', typescript: '@typescript-eslint/parser'} }
		}
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
