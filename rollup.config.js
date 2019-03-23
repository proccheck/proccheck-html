import resolve from "rollup-plugin-node-resolve";
import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2'

const config = [
  {
    input: "./src/index.ts",
    // NOTE: The first output is your transpiled typescript
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      resolve({
        jsnext: true,
        extensions: [".ts"],
      }),
      typescript({
        typescript: require('typescript'),
      }),
    ],
  },
  {
    input: "./src/index.ts",
    // NOTE: The second output is your bundled `.d.ts` file
    output: [{ file: pkg.types, format: "es" }],

    plugins: [
      typescript({
        typescript: require('typescript'),
      })
    ],
  },
];

export default config;