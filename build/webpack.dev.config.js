const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
// const publicPath = 'http://localhost:3000/';
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

const devConfig = {
  entry: {
    index: [path.resolve(__dirname, '../src/index.js'), hotMiddlewareScript],
    vendors: ['jquery', 'lodash'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/'),
    publicPath: 'http://localhost:3000/',
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.(png|jpg|eot|svg|ttf|woff)$/,
      loader: 'url?limit=8192&name=[name].[ext]',
    }, {
      test: /\.mp4$/,
      loader: 'url?mimetype=video/mp4&name=[name].[ext]',
    }, {
      test: /\.s(a|c)ss$/,
      loader: 'style!css?sourceMap!postcss!sass',
    }, {
      test: /\.css$/,
      loader: 'style!css?sourceMap!postcss',
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0', 'react'],
      },
    }],
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlwebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html',
      chunks: ['index', 'vendors'],
      inject: 'body',
    }),
  ],
};

module.exports = devConfig;
