/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D9A441',
          dark: '#9A6B12',
          bronze: '#B8862E',
          soft: '#FBF3E0',
          tint: '#F0DDB0',
          border: '#EBD9A8',
        },
        app: {
          bg: '#F8F5EF',
          surface: '#FFFFFF',
          'surface-alt': '#F1EDE3',
          'table-header': '#FBF9F4',
          border: '#ECE7DC',
          'input-border': '#DDD6C7',
          ink: '#14110B',
          charcoal: '#3A352C',
          'warm-grey': '#7A7367',
          muted: '#A39C8E',
          cream: '#F4EFE4',
        },
        sidebar: {
          bg: '#14110B',
          text: '#B9B1A0',
          active: '#2A2315',
          surface: '#211C13',
          border: '#2A2518',
          icon: '#4A4336',
        },
        status: {
          success: '#16A34A',
          'success-soft': '#E7F7EE',
          warning: '#D97706',
          'warning-soft': '#FEF3E0',
          danger: '#DC2626',
          'danger-soft': '#FDECEC',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '10px',
        modal: '20px',
      },
      boxShadow: {
        floating: '0 10px 28px rgba(15, 12, 6, 0.10)',
        soft: '0 4px 14px rgba(15, 12, 6, 0.05)',
      }
    },
  },
  plugins: [],
}
