/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
    
  ],

  theme: {
    extend: {
      backgroundImage: {
        'moving-background': "url('/styles/statics/background/parallax-bg.gif')",
       },
       

    },
    // 

  },
  plugins: [],
}
