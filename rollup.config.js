import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const env = process.env.NODE_ENV || 'development';

// browser-friendly builds
const browserBuild = {
  input: 'src/index.js',
  plugins: [
    resolve(), // so Rollup can find `mp3-parser`
    commonjs(), // so Rollup can convert `mp3-parser` to an ES module
  ],
  output: [
    // UMD
    {
      name: 'DADF',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    // ESM
    {
      file: pkg.browser.replace('umd', 'esm'),
      format: 'es',
      sourcemap: true,
    },
  ],
};

export default [
  browserBuild,

  env === 'production' && {
    ...browserBuild,
    plugins: [
      ...browserBuild.plugins,
      terser({
        output: {
          comments: (node, comment) =>
            comment.type == 'comment2' && /copyright/i.test(comment.value),
        },
      }),
    ],
    output: [
      // UMD
      {
        ...browserBuild.output[0],
        file: browserBuild.output[0].file.replace('.js', '.min.js'),
      },
      // ESM
      {
        ...browserBuild.output[1],
        file: browserBuild.output[1].file.replace('.js', '.min.js'),
      },
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/index.js',
    external: ['mp3-parser'],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
  },
].filter(Boolean);
