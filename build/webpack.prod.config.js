const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devConfig = {
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
    vendors: ['jquery', 'lodash'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/'),
  },
  module: {
    loaders: [{
      test: /\.(png|jpg|eot|svg|ttf|woff)$/,
      loader: 'url?limit=8192&name=[name].[ext]',
    }, {
      test: /\.mp4$/,
      loader: 'url?limit=10000&mimetype=video/mp4&name=[name].[ext]',
    }, {
      test: /\.s(a|c)ss$/,
      loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass', { publicPath: '../' }),
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css!autoprefixer', { publicPath: '../' }),
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
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('css/[name].css'),
    new HtmlwebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html',
      chunks: ['index', 'vendors'],
      inject: 'body',
    }),
  ],
};

module.exports = devConfig;
