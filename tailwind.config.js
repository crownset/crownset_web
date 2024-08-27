/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'left-right-bottom': '0 5px 4px 4px rgba(234,230,255), 0 -2px 25px 4px rgba(234,230,255), -2px 0 4px 4px rgba(234,230,255), 2px 0 4px 4px rgba(234,230,255)'
      },
      colors: {
        'primary-color': '#6754E9',
        'bodyTextColor': '#615f5b',
        "dashboard": "#0146cf",
        "navbar" : "#f5f6fa",
        "default": "#FFFFFF",
        "black" : "#000000",
        "textDefault": "#615e6b",
        "bgHover": "#7367f0",
        "premature" : "#f4ba13",
        "mature" : "#269346",
        "dead" : "#d63328"
      }

    },
  },
  plugins: [],
};
