import React from 'react';
import ReactDOMClient from 'react-dom/client';
import ReactServerDOMWebpackClient from 'react-server-dom-webpack/client';

const initialReactTreePromise = fetch('/rsc').then((response) => {
  return ReactServerDOMWebpackClient.createFromReadableStream(response.body);
});

function App() {
  return React.use(initialReactTreePromise);
}

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(<App />);
