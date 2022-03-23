/* eslint-disable no-console */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const escapeStringRegexp = require('escape-string-regexp');
const { version } = require('../package.json');

const devMode = process.env.NODE_ENV !== 'production';

let definePlugin;
if (process.env.NODE_ENV === 'development') {
  definePlugin = new webpack.DefinePlugin({
    VERSION: JSON.stringify('local-dev'),
    API_HOST_ENV: JSON.stringify(''),
  });
} else {
  definePlugin = new webpack.DefinePlugin({
    VERSION: JSON.stringify(version),
    API_HOST_ENV: JSON.stringify(''),
  });
}

const publicPath = '/static/';

const vendorModules = [
  'axios',
  'ramda',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-dom',
  'react-transition-group',
  'redux',
  'redux-devtools-extension',
  'redux-saga',
  'reselect',
  'typesafe-actions',
];

const entry = devMode
  ? ['core-js', 'regenerator-runtime/runtime', './src/index.tsx']
  : './src/index.tsx';

process.on('uncaughtException', (err) => {
  console.error(err.stack);
  console.log('Node NOT Exiting...');
});

module.exports = {
  mode: process.env.NODE_ENV,
  cache: true,
  entry,
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath,
    filename: 'bundle.[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
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
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]___[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [
                  { cleanupIDs: false }, // Causes collisions - same a,b,c,... ids in different SVGs
                  { removeViewBox: false },
                  { collapseGroups: false },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({ template: 'src/index.html', chunksSortMode: 'none' }),
    definePlugin,
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
    alias: {
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@env': path.resolve(__dirname, '../src/config/env'),
      '@axios': path.resolve(__dirname, '../src/axios'),
      '@ducks': path.resolve(__dirname, '../src/state/ducks'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
    },
  },
  devServer: {
    historyApiFallback: {
      index: '/static/index.html',
    },
    compress: true,
    contentBase: './',
    publicPath,
    inline: false, // for debugging on iOS
    hot: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        // target: 'http://localhost:8081',
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: '',
      },
    },
  },
};

if (!devMode) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.HashedModuleIdsPlugin(),
  ]);

  module.exports.optimization = {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      cacheGroups: {
        vendor: {
          test: new RegExp(
            `[\\\\/]node_modules[\\\\/](${vendorModules
              .map(escapeStringRegexp)
              .join('|')})[\\\\/]`
          ),
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  };
}

if (devMode) {
  /* eslint-disable import/no-unresolved, global-require */
  const dllManifest = require('../dll/vendor-manifest.json');

  const dllReferencePlugin = new webpack.DllReferencePlugin({
    context: path.resolve(__dirname, '../src'),
    manifest: dllManifest,
  });

  module.exports.plugins = (module.exports.plugins || []).concat([
    dllReferencePlugin,
  ]);
}
