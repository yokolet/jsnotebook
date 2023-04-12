import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin} from './plugins/unpkg-path-plugin';
import {fetchPlugin} from './plugins/fetch-plugin';

let started: boolean = false;
const bundle = async (rawCode: string) => {
  if (!started) {
    await esbuild.initialize({
      worker: true,
      wasmURL: '/esbuild.wasm',
      //wasmURL: 'https://unpkg.com/esbuild-wasm@0.17.16/esbuild.wasm',
    });
    started = true;
  }

  const result = await esbuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window',
    },
  });

  return result.outputFiles[0].text;
};

export default bundle;
