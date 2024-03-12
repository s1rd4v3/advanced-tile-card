import json from '@rollup/plugin-json';
import babel from 'rollup-plugin-babel';
import css from 'rollup-plugin-import-css';
import resolve from 'rollup-plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: ['src/index.ts'],
  output: {
    file: './dist/advanced-tile-card.js',
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    typescript(),
    json(),
    scss({
      output: false,
    }),
    css(),
    babel({
      exclude: 'node_modules/**',
    }),
    terser(),
    serve({
      contentBase: './dist',
      host: '0.0.0.0',
      port: 5001,
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
  ],
  context: 'window',
};
