import path from 'path'
import ts from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'

if (!process.env.TARGET) {
  throw new Error('Target package must be transfer')
}

const packages = path.resolve(__dirname, 'packages')
const pkgDir = path.resolve(packages, process.env.TARGET)
const name = path.basename(pkgDir)
const resolve = (p) => path.resolve(pkgDir, p)
const pkgJson = require(resolve(`package.json`))
const buildOptions = pkgJson.buildOptions
const needBuildTypes = !!process.env.BUILDTYPES

const outputConfigMap = {
  esm: {
    file: resolve(`dist/${name}.esm.js`),
    format: 'es',
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: 'cjs',
  },
  umd: {
    file: resolve(`dist/${name}.js`),
    format: 'umd',
  },
}

// 处理format
const defaultFormats = ['esm', 'cjs']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')
const pkgFormats = inlineFormats || buildOptions.formats || defaultFormats

const pkgConfigs =
  process.env.NODE_ENV === 'development'
    ? pkgFormats.map((format) => createConfig(format, outputConfigMap[format]))
    : []

if (process.env.NODE_ENV === 'production') {
  pkgFormats.forEach((format) => {
    if (buildOptions.prod === false) {
      return
    }
    pkgConfigs.push(createProdConfig(format, outputConfigMap[format]))
  })
}

needBuildTypes &&
  pkgConfigs.push({
    input: resolve(`dist/packages/${name}/src/index.d.ts`),
    output: {
      file: resolve(`dist/${name}.d.ts`),
      format: 'es',
    },
    plugins: [dts()],
  })

export default pkgConfigs

function createConfig(format, output, plugins = []) {
  if (format === 'umd') {
    output.name = buildOptions.name
    output.sourcemap = !!process.env.SOURCEMAP
  }
  // 打包ts
  const tsPlugin = ts({
    check: process.env.NODE_ENV === 'production',
    tsconfigDefaults: path.resolve(__dirname, 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, './node_modules/.ts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        target: 'es5',
        sourceMap: !!process.env.SOURCEMAP,
        removeComments: true,
        declaration: needBuildTypes,
        declarationMap: needBuildTypes,
      },
      include: [`packages/${process.env.TARGET}`],
      exclude: ['**/__test__'],
    },
  })

  const external = [
    ...Object.keys(buildOptions.dependencies || {}),
    ...Object.keys(buildOptions.peerDependencies || {}),
  ]

  const nodePlugins =
    format !== 'cjs'
      ? [
          require('@rollup/plugin-node-resolve').nodeResolve({
            referBuiltins: true,
          }),
          require('@rollup/plugin-commonjs')({
            sourceMap: true,
          }),
        ]
      : []

  return {
    input: resolve(`src/index.ts`),
    output,
    external,
    plugins: [tsPlugin, ...nodePlugins, ...plugins],
    treeshake: {
      moduleSideEffects: false,
    },
  }
}

function createProdConfig(format, output) {
  const { terser } = require('rollup-plugin-terser')
  return createConfig(
    format,
    // {
    //   file: output['file'].replace('.js', '.prod.js'),
    //   format: output['format'],
    // },
    output,
    [
      terser({
        module: format === 'esm',
        compress: {
          ecma: 2015,
        },
      }),
    ]
  )
}
