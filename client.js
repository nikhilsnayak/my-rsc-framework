import React from 'react';
import ReactDOMClient from 'react-dom/client';
import ReactServerDOMWebpackClient from 'react-server-dom-webpack/client';

const initialReactTreePromise = fetch('/rsc').then((response) => {
  return ReactServerDOMWebpackClient.createFromReadableStream(response.body);
});

function App() {
  const [tree, setTree] = React.useState(initialReactTreePromise);

  React.useEffect(() => {
    window.__updateTree = (stream) => {
      const reactTreePromise =
        ReactServerDOMWebpackClient.createFromReadableStream(stream);
      setTree(reactTreePromise);
    };

    return () => {
      window.__updateTree = undefined;
    };
  }, []);

  return React.use(tree);
}

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(<App />);