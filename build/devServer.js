const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.dev.config');

const app = express();
const compiler = webpack(config);

app.use(express.static(__dirname));
app.use(webpackMiddleware(compiler, {
  noInfo: true,
  stats: {
    colors: true,
  },
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('/video.mp4', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src', 'video.mp4'));
});
app.listen(3000);
console.log('listen on localhost:3000');
