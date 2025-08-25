import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import css from 'rollup-plugin-import-css';
import nodeResolve from 'rollup-plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5001,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  nodeResolve({}),
  commonjs(),
  typescript(),
  json(),
  scss({
    output: false,
  }),
  css(),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
  }),
  dev && serve(serveopts),
  !dev && terser(),
];

export default [
  {
    input: 'src/index.ts',
    output: {
      file: './dist/advanced-tile-card.js',
      format: 'es',
      inlineDynamicImports: true,
    },
    plugins: [...plugins],
    context: 'window',
  },
];
