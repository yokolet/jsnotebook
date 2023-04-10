import * as esbuild from 'esbuild-wasm';
import {useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import {unpkgPathPlugin} from './plugins/unpkg-path-plugin';
import {fetchPlugin} from './plugins/fetch-plugin';

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: '/esbuild.wasm',
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

    // const result = await esbuild.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015',
    // });
    // console.log(result);
    // setCode(result.code);
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

    //console.log(result.outputFiles);
    setCode(result.outputFiles[0].text);
  }

  return (<div>
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
    ></textarea>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <pre>{code}</pre>
  </div>
  );
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
