/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			height: {
				112: '32rem'
			},
			spacing: {
				128: '32rem'
			}
		}
	},
	plugins: []
};
