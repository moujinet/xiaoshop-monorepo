import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src/modules')}/`,
      '~': `${path.resolve(__dirname, 'src')}/`,
      '~~': `${path.resolve(__dirname)}/`,
    },
  },
  test: {
    include: ['test/**/*.test.ts'],
  },
})
