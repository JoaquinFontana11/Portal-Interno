/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			height: {
				112: '32rem',
				126: '38rem'
			},
			spacing: {
				128: '32rem'
			},
			backgroundImage: {
				proyectCard:
					"linear-gradient(145deg, rgba(255,255,255, 0.1) 0%, rgba(255,255,255, 0.1) 100%), url('/img/background-proyect-card.svg')",
				section:
					"linear-gradient(145deg, rgba(255,255,255, 0.1) 0%, rgba(255,255,255, 0.1) 100%), url('/img/background.svg')",
				homeCard:
					"linear-gradient(145deg, rgba(255,255,255, 0.1) 0%, rgba(255,255,255, 0.1) 100%), url('/img/layered-steps-haikei.svg')",
				homeCardHover:
					"linear-gradient(145deg, rgba(255,255,255, 0.1) 0%, rgba(255,255,255, 0.1) 100%), url('/img/layered-waves-haikei.svg')"
			}
		}
	},
	plugins: []
};
