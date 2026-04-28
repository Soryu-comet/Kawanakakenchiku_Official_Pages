/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./static/**/*.js"],
    theme: {
        extend: {
            colors: {
                'brand-green': '#2c4c3b',
                'brand-orange': '#c85a17',
                'brand-dark': '#222222',
                'brand-gray': '#525252',
                'brand-light': '#f9f8f6',
            },
            fontFamily: {
                sans: ['Zen Kaku Gothic New', 'sans-serif'],
                serif: ['Shippori Mincho', 'serif'],
            },
            boxShadow: {
                'soft': '0 20px 40px -15px rgba(0,0,0,0.05)',
                'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
                'hover-soft': '0 30px 60px -15px rgba(0,0,0,0.15)',
            }
        }
    },
    plugins: [],
}
