/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'base-black': '#121212',
      },
      backgroundImage: {
        'gradient-to-t': 'linear-gradient(rgba(0,0,0,.3) 0, #121212 100%), url(/imgs/background.svg)'
      },
      backgroundColor: {
        'base': '#121212',
        'highlight': '#1a1a1a',
        'press': '#000',
        'playlist-vertical': '#181818',
        'playlist-vertical-highlight': '#282828',
        'playlist-horizontal-min': 'hsla(0,0%,100%,.1)',
        'playlist-horizontal-min-highlight': 'hsla(0,0%,100%,.2)',
        'button-active': '#1db954',
        'button-active-hover': '#1ed760',
        'playlist-progress': 'hsla(0,0%,100%,.3)',
        'elevated-base': '#242424',
        'bright-accent': '#1ed760',
        'elevated-highlight': '#2a2a2a',
        'elevated-press': '#000',
        'tinted-base': 'hsla(0,0%,100%,.07)',
        'tinted-highlight': 'hsla(0,0%,100%,.1)',
        'tinted-press': 'hsla(0,0%,100%,.04)',
        'unsafe-for-small-text-base': '#121212',
        'unsafe-for-small-text-highlight': '#121212',
        'unsafe-for-small-text-press': '#121212',
      },
      textColor: {
        'base-white': '#fff',
        'subdued': '#a7a7a7',
        'subtle': '#b3b3b3',
        'bright-accent': '#1ed760',
        'button-active': '#1db954',
        'button-active-hover': '#1ed760',
        'negative': '#f15e6c',
        'warning': '#ffa42b',
        'positive': '#1ed760',
        'announcement': '#3d91f4',
      },
      borderColor: {
        'essential-base': '#fff',
        'essential-subdued': '#727272',
        'essential-bright-accent': '#1ed760',
        'essential-negative': '#e91429',
        'essential-warning': '#ffa42b',
        'essential-positive': '#1ed760',
        'essential-announcement': '#0d72ea',
        'decorative-base': '#fff',
        'decorative-subdued': '#292929',
      },
    },
  },
  plugins: [],
};
