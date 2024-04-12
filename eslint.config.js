import antfu from '@antfu/eslint-config'

export default antfu(
  {
    stylistic: {
      indent: 2,
      quotes: 'single',
    },

    typescript: true,

    vue: true,

    ignores: [
      'dist',
      'snapshots*',
      'node_modules',
      'packages/apis/**',
      'packages/docs/**',
    ],
  },
)
