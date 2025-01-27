import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export const darkMode = ['class'];
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    colors: {
      primary: '#6666FF',
      secondary: '#EAF3F8',
      lightGrey: '#D9D9D9',
      deereGreen: '#047C00',
      SteelGray: '#797979',
      greyWhite: '#E7E7E7',
      millionGrey: '#9A9A9A',
      grimGrey: '#E3DBDB',
      youngNight: '#232323',
      teleGrey: '#b3b3ff',
      ironGrey: '#444444',
      signalWhite: '#F0F0FF',
      tomatoRed: '#D8321C',
      star: '#FBC02D',
      blue: '#0F60FF',
      triton: '#2B8ABC',
      whiteBackground: '#F9FAFB',
      orangeCrush: '#EC7C26',
      mouseGrey: '#6A6A6A',
      borderColor: '#E9E7FD',
      snowFlake: '#F0F0F0',
      salt: '#EEEFF2',
      snow: '#F6F8FA',
      trout: '#4E5258',
      silentSea: '#F9FAFB',
      pigeon: '#ACACAC',
      nickel: '#939393',
    },
    fontFamily: {
      sans: ['var(--font-sans)', ...fontFamily.sans],
    },
  },
};
