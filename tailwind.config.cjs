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
				home: "linear-gradient(145deg, rgba(224 ,242, 254, 0.2) 0%, rgba(186, 230, 253, 0.2) 100%), url('/img/header.png')",
				homeBack: "background-image: url('/img/fondo.svg')",
				homeCard:
					"linear-gradient(145deg, rgba(255,255,255, 0.1) 0%, rgba(255,255,255, 0.1) 100%), url('/img/layered-steps-haikei.svg')",
				homeCardHover:
					"linear-gradient(145deg, rgba(255,255,255, 0.1) 0%, rgba(255,255,255, 0.1) 100%), url('/img/layered-waves-haikei.svg')",
				gradientWhite:
					'linear-gradient(180deg, rgba(255,255,255, 0.6) 0%, rgba(186, 230, 253, 0.4) 100%)',
				gradientSky2:
					'linear-gradient(180deg, rgba(186, 230, 253, 0.4) 0%, rgba(186, 230, 253, 0.6) 100%)',
				gradientSky:
					'linear-gradient(180deg, rgba(186, 230, 253, 0.6) 0%, rgba(186, 230, 253, 0.8) 100%)'
	
			}
		}
	},
	plugins: []
};
