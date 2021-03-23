import { defineConfig } from '@xus/cli'

export default defineConfig({
  libBuild: {
    target: 'esnext',
    formats: ['esm', 'cjs'],
    minify: false,
    sourcemap: false,
    alwaysEmptyDistDir: true,
    lerna: {
      excludePkgs: ['leetcode']
    }
  },
  lint: {
    eslint: {
      include: ['./packages'],
      ext: ['.ts']
    },
    stylelint: false
  },
  release: {
    branch: 'master'
  }
})
