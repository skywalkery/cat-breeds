/* eslint-disable no-param-reassign */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  mode: process.env.NODE_ENV,
  externals: fs.readdirSync('node_modules').reduce((e, m) => {
    e[m] = `commonjs ${m}`;
    return e;
  }, {}),
  entry: './src/server.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
};
