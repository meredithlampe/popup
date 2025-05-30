const { theme } = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      // mono: 'var(--font-mono)',
      // sans: 'var(--font-sans)',
      // serif: 'var(--font-serif)',
    },
    // colors
    colors: {
      lightestGray: '#F0F0F0',
      lightGray: '#A3A5AA',
      darkGray: '#28292B',
      medGray: '#636468',
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
      red: '#FF0000',
    },
    extend: {
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
        'span-21': 'span 21 / span 21',
        'span-22': 'span 22 / span 22',
        'span-23': 'span 23 / span 23',
        'span-24': 'span 24 / span 24',
      },
      gridColumnStart: {
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
        25: '25',
      },
      gridColumnEnd: {
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
        25: '25',
      },
    },
  },
  safelist: [
    'object-left',
    'aspect-[3/4]',
    'aspect-[5/4]',
    'aspect-[5/6]',
    'object-cover',
    'border-[#727379]',
    'text-[#727379]',
    'text-[#A3A5AA]',
    'placeholder:text-[#A3A5AA]',
    'border-[#A3A5AA]',
    'text-white',
  ],
  plugins: [require('@tailwindcss/typography')],
}
