/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#0F172A',
        accent: '#22C55E',
        background: '#F8FAFC',
        textColor: '#1E293B',
        borderColor: '#E2E8F0',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        button: '8px',
        card: '12px',
      },
      spacing: {
        16: '16px',
        24: '24px',
        32: '32px',
      }
    },
  },
  plugins: [],
}
