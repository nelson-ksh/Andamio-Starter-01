import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-br': 'linear-gradient(to bottom right, rgb(55 65 81), rgb(30 45 45))',
        'gradient-tl': 'linear-gradient(to top left, rgb(55 65 81), rgb(30 45 45))',
      },
    },
  },
  plugins: [require("daisyui")],
}
export default config
