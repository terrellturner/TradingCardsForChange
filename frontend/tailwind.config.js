/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        colors: {
            'hops-green': '#172601',
            'pale-ale-green': '#687343',
            'draft-yellow': '#D9BC66',
            'ipa-beige': '#D9B166',
            'newsletter-black': '#0D0D0D',
            'off-white': '#ececec',
            'opaque-newsletter-black': 'rgb(13,13,13,0.7)',
        },
        fontFamily: {
            serif: ['Baskervville SC', 'serif'],
            'sans-serif': ['Poppins', 'sans-serif'],
            jacquard: ['"Jacquard 24"', 'serif'],
        },
    },
    plugins: [],
};
