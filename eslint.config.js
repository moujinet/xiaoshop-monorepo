import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',

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
      'packages/api/src/**/*.ts',
      'packages/api/tests/**/*.ts',
    ],
    rules: {
      'no-console': 'off',
      'node/no-path-concat': 'off',
      'node/prefer-global/process': 'off',
      'ts/consistent-type-imports': 'off',
      'test/prefer-lowercase-title': 'off',
    },
  },
  {
    files: [
      'packages/api/**/*.ts',
      'packages/shared/**/*.ts',
    ],
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'line-length',
          sortSideEffects: true,
          internalPattern: ['@/**', '~/**', '~~/**'],
          groups: [
            'type',
            'internal-type',
            ['parent-type', 'sibling-type', 'index-type'],
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
        },
      ],
    },
  },
)
