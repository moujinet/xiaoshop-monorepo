import antfu from '@antfu/eslint-config'

export default antfu(
  {
    stylistic: {
      indent: 2,
      quotes: 'single',
    },

    typescript: true,
    jsonc: false,
    yaml: false,
    vue: true,

    ignores: [
      'dist',
      'snapshots*',
      'node_modules',
      'packages/docs/**',
    ],
  },
  {
    files: [
      'packages/apis/nestjs/src/**/*.ts',
      'packages/apis/nestjs/tests/**/*.test.ts',
    ],
    rules: {
      'no-console': 'off',

      'node/no-path-concat': 'off',
      'node/prefer-global/process': 'off',

      'ts/consistent-type-imports': 'off',

      'test/prefer-lowercase-title': 'off',
    },
  },
)
