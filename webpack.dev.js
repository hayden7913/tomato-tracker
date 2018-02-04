const path =  require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /(\.scss$|\.css$)/,
        exclude: /node_modules/,
        use: ['style-loader', 'raw-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    overlay: true,
    port: 3000,
    stats: 'minimal',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
