import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: 'rgba(var(--theme-color-rgb), <alpha-value>)',
      fill: 'rgba(var(--gray-2), <alpha-value>)',
    },
  },
  shortcuts: [
    {
      // utils
      'flex-center': 'items-center justify-center',
      'flex-v-center': 'items-center',
      'flex-h-center': 'justify-center',
      'flex-between': 'justify-between',
      'absolute-center': 'left-50% top-50% translate-x--1/2 translate-y--1/2',
      'absolute-v-center': 'top-50% translate-y--1/2',
      'absolute-h-center': 'left-50% translate-x--1/2',
    },
  ],
  presets: [
    presetUno({
      attributifyPseudo: true,
    }),
    presetAttributify(),
    presetTypography(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
