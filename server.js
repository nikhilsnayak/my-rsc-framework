require('@babel/register')({
  ignore: [/[\\\/](dist|node_modules)[\\\/]/],
  presets: [['@babel/preset-react', { runtime: 'automatic' }]],
  plugins: ['@babel/plugin-transform-modules-commonjs'],
});

const express = require('express');
const path = require('path');
const React = require('react');
const ReactServerDOMWebpackServer = require('react-server-dom-webpack/server');
const { App } = require('./app');

const app = express();
const PORT = 1234;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/rsc', (req, res) => {
  res.setHeader('Content-Type', 'text/x-component');
  const tree = React.createElement(App);
  const rscStream = ReactServerDOMWebpackServer.renderToPipeableStream(tree);
  rscStream.pipe(res);
});

app.get('*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
