const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const chalk = require('chalk')
const { targets: allPkgs, fuzzyMatchTargets } = require('./utils')
// 参数处理
const args = require('minimist')(process.argv.slice(2))
const pkgs = args._
const isAllMatch = args.all || args.a
const prod = args.prod || args.p
const formats = args.formats || args.f
const sourceMap = args.sourceMap || args.s
const buildTypes = args.types || args.t

run()

async function run() {
  // 是否指定打包pkg
  if (!pkgs.length) {
    await buildAll(allPkgs)
  } else {
    // 模糊匹配 包名
    await buildAll(fuzzyMatchTargets(pkgs, isAllMatch))
  }
}

async function buildAll(pkgs) {
  for (const pkg of pkgs) {
    console.info(chalk.bold(chalk.yellow(`Rollup for ${pkg}`)))
    await build(pkg)
  }
}

async function build(pkg) {
  // 获取package.json
  const pkgDir = path.resolve(`packages/${pkg}`)
  const pkgJson = require(`${pkgDir}/package.json`)

  // 如果指定了格式 则清除原dist文件夹
  if (!formats) {
    await fs.remove(`${pkgDir}/dist`)
  }

  // 环境信息
  const env =
    (pkgJson.buildOptions && pkgJson.buildOptions.env) ||
    (prod ? 'production' : 'development')

  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      [
        `NODE_ENV:${env}`,
        `TARGET:${pkg}`,
        formats ? `FORMATS:${formats}` : '',
        sourceMap ? `SOURCEMAP:true` : '',
        buildTypes ? `BUILDTYPES:true` : '',
      ]
        .filter(Boolean)
        .join(','),
    ],
    {
      stdio: 'inherit',
    }
  )

  fs.remove(`${pkgDir}/dist/packages`)
}
