/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    'bg-indigo-500', 'bg-green-500', 'bg-blue-500', 'bg-pink-500', 'bg-yellow-500', 'bg-purple-500',
    'bg-indigo-100', 'bg-green-100', 'bg-blue-100', 'bg-pink-100', 'bg-yellow-100', 'bg-purple-100',
    'text-indigo-800', 'text-green-800', 'text-blue-800', 'text-pink-800', 'text-yellow-800', 'text-purple-800',
    'hover:bg-indigo-200', 'hover:bg-green-200', 'hover:bg-blue-200', 'hover:bg-pink-200', 'hover:bg-yellow-200', 'hover:bg-purple-200',
    'hover:text-indigo-900', 'hover:text-green-900', 'hover:text-blue-900', 'hover:text-pink-900', 'hover:text-yellow-900', 'hover:text-purple-900',
  ],
  plugins: []
}

