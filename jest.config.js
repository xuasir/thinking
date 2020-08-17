const path = require('path')

module.exports = {
  preset: 'ts-jest',
  rootDir: __dirname,
  globals: {
    __VUE2__: false,
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/__test__/**'],
  coverageDirectory: path.resolve(__dirname, 'coverage'),
  coverageReporters: ['html', 'text'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  watchPathIgnorePatterns: ['node_modules'],
  testMatch: ['<rootDir>/packages/**/__test__/**/*spec.[jt]s?(x)'],
  setupFiles: [
    '<rootDir>/packages/vuehooks/__test__/helper/useComposition.ts',
    '<rootDir>/packages/vuehooks/__test__/setupTest.js',
  ],
}
