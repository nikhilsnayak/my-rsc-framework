require('react-server-dom-webpack/node-register')();
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
const clientManifest = require('./dist/react-client-manifest.json');

const app = express();
const PORT = 1234;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/rsc', (req, res) => {
  const tree = React.createElement(App, {
    searchParams: new URLSearchParams(req.query),
  });
  const rscStream = ReactServerDOMWebpackServer.renderToPipeableStream(
    tree,
    clientManifest
  );
  res.setHeader('Content-Type', 'text/x-component');
  rscStream.pipe(res);
});

app.get('*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
