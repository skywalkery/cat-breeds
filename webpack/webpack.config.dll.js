const webpack = require('webpack');
const path = require('path');
const packageJSON = require('../package.json');

const vendorLibs = Object.keys(packageJSON.dependencies);
const exclude = ['express', 'http-proxy'];
const vendors = vendorLibs.filter((x) => exclude.indexOf(x) < 0);

module.exports = {
  mode: 'development',
  entry: {
    vendor: vendors,
  },
  output: {
    path: path.join(__dirname, '../dll'),
    filename: 'dll.[name].js',
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll', '[name]-manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname, '../src'),
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
  },
};
