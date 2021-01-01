module.exports = {
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '20px': '20px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
