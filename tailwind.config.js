/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        thin: {
          '::-webkit-scrollbar': {
            width: '8px',
          },
          '::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            
          },
          '::-webkit-scrollbar-thumb': {
            background: '#888',
            
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }
      },

      boxShadow: {
        'left-right-bottom': '0 5px 4px 4px rgba(234,230,255), 0 -2px 25px 4px rgba(234,230,255), -2px 0 4px 4px rgba(234,230,255), 2px 0 4px 4px rgba(234,230,255)'
      },
      colors: {
        'primary-color': '#6754E9',
        'bodyTextColor': '#615f5b',
        "dashboard": "#4d7edd",
        "dashboardUserBg" :"#f3f6fd",
        "navbar" : "#f5f6fa",
        "default": "#FFFFFF",
        "black" : "#000000",
        "textDefault": "#615e6b",
        "bgHover": "#7367f0",
        "premature" : "#f4ba13",
        "mature" : "#269346",
        "dead" : "#d63328",
      }

    },
  },
  plugins: [],
};
