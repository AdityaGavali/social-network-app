/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    },
      colors :{
        'primary':'#1877f2',
        'bg':'#1C0C58',
        'secondary':'#ffffff',
        'gray':"#D3D3D3",
        'default-layout-bg':"#1a1a1b",
        'light-gray':"#D3D3D3",
        'card-border':"#9b34eb"
        
      },
      screens: {
        '2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }
  
        'xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }
  
        'lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }
  
        'md': {'max': '767px'},
        // => @media (max-width: 767px) { ... }
  
        'sm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }
      }
  
  },
  plugins: [],
}

