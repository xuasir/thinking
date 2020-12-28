const semver = require('semver')
const execa = require('execa')
const chalk = require('chalk')
const { prompt } = require('enquirer')
const path = require('path')
const fs = require('fs')
const args = require('minimist')(process.argv.slice(2))
const { targets: allPkgs } = require('./utils')

const inlinePkgs = args._
const waitForReleasePkgs = inlinePkgs.length > 0 ? inlinePkgs : allPkgs
const skipTests = args.skipTests || args.st
const skipBuild = args.skipBuild || args.sb
const preId = args.preId || ''

const versionIncrements = [
  'patch',
  'minor',
  'major',
  'prepatch',
  'preminor',
  'premajor',
  'prerelease',
]
const pkgNameToNextVersionMap = {}

const inc = (curVersion, i) => semver.inc(curVersion, i, preId)
// const bin = (name) => path.resolve(__dirname, `../node_modules/.bin/${name}`)
const run = (bin, args, opts = {}) =>
  execa(bin, args, {
    stdio: 'inherit',
    ...opts,
  })
const getPkgRoot = (pkgName) =>
  path.resolve(__dirname, `../packages/${pkgName}`)
const step = (msg) => console.log(chalk.cyan(msg))

async function main() {
  for (const pkgName of waitForReleasePkgs) {
    await ensureVersion(pkgName)
  }
  if (Object.keys(pkgNameToNextVersionMap).length > 0) {
    workForPublish()
  }
}

async function ensureVersion(pkgName) {
  let targetVersion = ''
  const pkgRoot = getPkgRoot(pkgName)
  const pkgJson = require(path.resolve(pkgRoot, 'package.json'))
  const currentVersion = pkgJson.version
  if (pkgJson.private) {
    return
  }
  step(`ensure version for ${chalk.yellow(pkgName)}`)
  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements
      .map((i) => `${i} (${inc(currentVersion, i)})`)
      .concat(['custom']),
  })
  if (release === 'custom') {
    targetVersion = (
      await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion,
      })
    ).version
  } else {
    targetVersion = release.match(/\((.*)\)/)[1]
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`version: ${targetVersion} is invalid!`)
  }

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  })

  if (!yes) {
    return
  }

  pkgNameToNextVersionMap[pkgName] = targetVersion
}

async function workForPublish() {
  // run test
  step(`run test...`)
  if (!skipTests) {
    await run('yarn', ['test'])
  } else {
    console.log(`(skipped)`)
  }

  // run build
  step(`run build...`)
  if (!skipBuild) {
    await run('yarn', [
      'build',
      ...Object.keys(pkgNameToNextVersionMap),
      '-a',
      '-s',
      '-t',
      '-p',
    ])
  } else {
    console.log(`(skipped)`)
  }

  // update version
  step(`Updating cross dependencies...`)
  updateVersion()

  // generate changelog
  step(`generate changelog...`)
  await run('yarn', ['changelog'])
  const { stdout } = await run('git', ['diff'], {
    stdio: 'pipe',
  })
  if (stdout) {
    step(`committing changes...`)
    await run('git', ['add', '-A'])
    await run('git', [
      'commit',
      '-m',
      `release: publish packages: ${Object.keys(pkgNameToNextVersionMap).join(
        ','
      )}`,
      '--no-verify',
    ])
  } else {
    console.info(`nothing to commit...`)
  }

  // publish
  step(`publish packages...`)
  pubilshPackage()

  // push and tag
  step(`push to giihub...`)
  await run('git', ['tag', `${generateTag()}`])
  await run('git', ['push', 'origin', `refs/tags/${generateTag()}`])
  await run('git', ['push', 'origin', 'master'])

  console.log()
}

function updateVersion() {
  allPkgs.forEach((pkg) => updatePackage(pkg))
}

function updatePackage(pkg) {
  const pkgRoot = getPkgRoot(pkg)
  const pkgJsonPath = path.resolve(pkgRoot, 'package.json')
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
  if (Object.prototype.hasOwnProperty.call(pkgNameToNextVersionMap, pkg)) {
    pkgJson.version = pkgNameToNextVersionMap[pkg]
  }
  updateDeps(pkgJson, 'dependencies')
  updateDeps(pkgJson, 'devDependencies')
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2))
}

function updateDeps(pkgJson, key) {
  let deps = pkgJson[key]
  if (!deps) return
  Object.keys(deps).forEach((dep) => {
    let version = null
    if (
      dep.startsWith('@xuguo') &&
      (version = pkgNameToNextVersionMap[dep.replace(/@xuguo\//, '')])
    ) {
      console.log(
        chalk.green(`${pkgJson.name} --> ${key} --> ${dep}@${version}`)
      )
      deps[dep] = version
    }
  })
}

async function pubilshPackage() {
  for (const pkgName of Object.keys(pkgNameToNextVersionMap)) {
    const pkgRoot = getPkgRoot(pkgName)
    const pkgJson = path.resolve(pkgRoot, 'package.json')
    const version = pkgNameToNextVersionMap[pkgName]
    if (pkgJson.private) {
      return
    }

    step(`publishing...`)
    try {
      await run(
        'yarn',
        ['publish', '--new-version', version, '--access', 'public'],
        {
          cwd: pkgRoot,
          stdio: 'pipe',
        }
      )
      console.log(
        chalk.green(`Successfully published ${'@vcake/' + pkgName}@${version}`)
      )
    } catch (e) {
      console.log()
      throw e
    }
  }
}

function generateTag() {
  return Object.keys(pkgNameToNextVersionMap)
    .map((pkg) => {
      return `@vcake/${pkg}-v${pkgNameToNextVersionMap[pkg]}`
    })
    .join('|')
}

main().catch((err) => {
  console.error(err)
})
