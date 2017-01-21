import resolve from 'rollup-plugin-node-resolve'
import sourcemaps from 'rollup-plugin-sourcemaps'

export default {
  entry: 'dist/client.js',
  dest: 'dist/client.bundle.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    sourcemaps(),
    resolve({ jsnext: true, browser: true, }),
  ]
}