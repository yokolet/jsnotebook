import * as esbuild from 'esbuild-wasm';
import {useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import {unpkgPathPlugin} from './plugins/unpkg-path-plugin';
import {fetchPlugin} from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState('');

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: '/esbuild.wasm',
      //wasmURL: 'https://unpkg.com/esbuild-wasm@0.17.16/esbuild.wasm',
    });
    ref.current = true;
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    iframe.current.srcdoc = html;

    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  }

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
`;

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value => setInput(value))}
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe title="code preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
