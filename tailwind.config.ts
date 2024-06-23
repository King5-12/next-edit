import type { Config } from 'tailwindcss';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    spacing: Array.from({ length: 1000 }).reduce((map: any, _, index) => {
      map[index] = `${index}px`;
      return map;
    }, {}) as ResolvableTo<KeyValuePair<string, string>>,
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        '1px-inset': '1px 1px 0px #BFBDBD inset',
        '1px': '1px 1px 0px #BFBDBD',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
export default config;
