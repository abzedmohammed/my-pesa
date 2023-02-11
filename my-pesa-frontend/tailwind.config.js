/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'./src/**/*.{js,jsx}', 
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {
			screens: {
				xs: '375px',
				...defaultTheme.screens,
			},
		},
	},
	plugins: [require('daisyui'), require('flowbite/plugin')],
};