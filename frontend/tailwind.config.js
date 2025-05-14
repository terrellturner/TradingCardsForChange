/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'emerald-green': '#284139',
				wasabi: '#809076',
				'creased-khaki': '#FBD794',
				'egyptian-earth': '#BB6830',
				'noir-de-vigne': '#111A19',
				'off-white': '#ececec',
				'opaque-noir-de-vigne': 'rgb(13,13,13,0.7)',
			},
		},
		fontFamily: {
			serif: ['Playfair Display', 'serif'],
			'sans-serif': ['Lato', 'sans-serif'],
			jacquard: ['"Jacquard 24"', 'serif'],
		},
	},
	plugins: [],
};
