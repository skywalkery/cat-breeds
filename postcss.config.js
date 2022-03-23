const path = require('path');

module.exports = ({ env }) => ({
  ident: 'postcss',
  syntax: 'postcss-scss',
  plugins: {
    'postcss-normalize': {},
    'postcss-mixins': {
      mixinsDir: path.join(__dirname, '/src/styles/mixins'),
    },
    "postcss-nested-ancestors": {},
    'postcss-nested': {},
    'postcss-custom-media': {
      importFrom: path.join(__dirname, '/src/styles/customMedia.js'),
    },
    'postcss-preset-env': {},
    cssnano: env === 'production' ? { preset: 'default' } : false,
  },
});
