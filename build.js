const path = require('path');
const webpack = require('webpack');
const ReactServerWebpackPlugin = require('react-server-dom-webpack/plugin');

const builder = webpack({
  mode: process.env.NODE_ENV ?? 'development',
  entry: path.resolve(__dirname, './client.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'client.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [new ReactServerWebpackPlugin({ isServer: false })],
});

builder.run((err) => {
  if (err) console.error('Webpack Build Failed', err);
});
