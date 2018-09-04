// Nau standard eslint rules, save it as .eslintrc.js
module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	plugins: ['react'],
	parser: 'babel-eslint',
	env: { browser: true, node: true, es6: true },
	parserOptions: {
		ecmaVersion: 8,
		sourceType: 'module',
		impliedStrict: true,
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		'no-console': 'off',
		'react/prop-types': 'off',
	},
	settings: {
		react: {
			version: '16.4',
		},
	},
};
