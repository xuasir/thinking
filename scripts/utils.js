const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const resolve = (p) => path.resolve(process.cwd(), p)

const targets = (exports.targets = fs.readdirSync('packages').filter((f) => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) return false
  try {
    const pkg = require(resolve(`./packages/${f}/package.json`))
    if (pkg.private || !pkg.buildOptions) return false
    return true
  } catch (e) {
    return false
  }
}))

exports.fuzzyMatchTargets = function (fuzzyTargets, isAllMatch) {
  let matched = []
  fuzzyTargets.forEach((fuzzyTarget) => {
    for (const target of targets) {
      if (target.match(fuzzyTarget)) {
        matched.push(target)
      }
      if (!isAllMatch) break
    }
  })

  if (matched.length) {
    return matched
  } else {
    console.log()
    console.error(
      `
        ${chalk.bgRed.white('ERROR')} ${chalk.red(
        `Targets ${fuzzyTargets} not found`
      )}
      `
    )
    console.log()

    process.exit(1)
  }
}
