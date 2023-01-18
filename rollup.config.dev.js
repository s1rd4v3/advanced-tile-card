import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import css from "rollup-plugin-import-css";
import scss from 'rollup-plugin-scss'

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
      port: 5000,
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
  ],
};
