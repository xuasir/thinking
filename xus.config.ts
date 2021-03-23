import { defineConfig } from '@xus/cli'

export default defineConfig({
  libBuild: {
    target: 'esnext',
    formats: ['esm', 'cjs'],
    minify: false,
    sourcemap: false,
    alwaysEmptyDistDir: true
  },
  lint: {
    eslint: {
      include: 'packages/**/src/**/*',
      ext: ['.ts']
    },
    stylelint: false
  },
  release: {
    branch: 'master'
  }
})
