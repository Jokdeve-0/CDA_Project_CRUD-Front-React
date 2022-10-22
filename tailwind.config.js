const tailwindCssFormPlugin = require('@tailwindcss/forms');
const defaultColors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * @see {@link https://www.tailwindshades.com/}
 */
module.exports = {
  content: [
    './src/**/*.jsx',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [
    [require("daisyui"),tailwindCssFormPlugin, require('flowbite/plugin')]
  ],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // base color #1d3ed3
        // base stop 600
        primary: {
          DEFAULT: '#1d3ed3',
          50: '#d7ddf9',
          100: '#c5cef7',
          200: '#a1b0f2',
          300: '#7d92ed',
          400: '#5973e8',
          500: '#3555e3',
          600: '#1d3ed3',
          700: '#1630a2',
          800: '#0f2170',
          900: '#09133f',
        },
        danger: defaultColors.red,
      },
    },
  },
};