/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure correct file path
	theme: {
	  extend: {},
	},
	plugins: [require("daisyui")], // DaisyUI plugin
  };
  