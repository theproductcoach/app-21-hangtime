import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background-soft': '#F3CFEF',
        'primary': '#50BFEF',
        'accent': '#F06EAA',
        'text-dark': '#2B2B2B',
        'text-muted': '#6B7280',
      },
    },
  },
  plugins: [],
};

export default config; 