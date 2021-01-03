module.exports = {
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '20px': '20px',
        '40px': '40px',
      },
      width: {
        '40px': '40px',
      },
      backgroundColor: {
        'dark-grey': '#19191a',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
