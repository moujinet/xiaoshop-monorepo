import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    alias: {
      '@/': './src/modules',
      '#/': './test',
      '~/': './src',
      '~~/': '.',
    },
    root: './',
  },
  resolve: {
    alias: {
      '@/': './src/modules',
      '#/': './test',
      '~/': './src',
      '~~/': '.',
    },
  },
  plugins: [
    swc.vite(),
  ],
})
