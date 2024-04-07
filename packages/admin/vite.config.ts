import path from 'node:path'
import type { ConfigEnv, PluginOption, UserConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Layouts from 'vite-plugin-vue-layouts'
import SvgLoader from 'vite-svg-loader'
import UnoCSS from 'unocss/vite'
import VueComponents from 'unplugin-vue-components/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueMacros from 'unplugin-vue-macros/vite'
import VueRouter from 'unplugin-vue-router/vite'

import { loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import { unheadVueComposablesImports } from '@unhead/vue'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

const plugins: PluginOption[] = [
  // https://github.com/vue-macros/vue-macross
  VueMacros({
    plugins: {
      vue: Vue(),
      vueJsx: VueJsx(),
    },
  }),

  // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
  Layouts({
    layoutsDirs: 'src/layouts',
  }),

  // https://github.com/posva/unplugin-vue-router
  VueRouter({
    dts: 'src/typed-router.d.ts',
    routesFolder: [
      'src/pages',
      {
        src: 'src/modules',
        filePatterns: '**/pages/**/*',
        path: (file) => {
          const prefix = 'src/modules'
          return `${file.slice(file.lastIndexOf(prefix) + prefix.length + 1).replace('/pages', '')}`
        },
      },
    ],
    logs: true,
    exclude: ['**/components/**'],
  }),

  // https://github.com/unplugin/unplugin-auto-import
  AutoImport({
    dirs: [
      'src/composables',
      'src/utils',
      'src/utils/runtime',
    ],
    imports: [
      'vue',
      'pinia',
      {
        '@arco-design/web-vue': [
          ['Message', 'AMessage'],
          ['Notification', 'ANotification'],
        ],
      },
      VueRouterAutoImports,
      unheadVueComposablesImports,
    ],
    dts: 'src/auto-imports.d.ts',
    resolvers: [
      ArcoResolver(),
    ],
    vueTemplate: true,
    injectAtEnd: true,
  }),

  // https://github.com/unplugin/unplugin-vue-components
  VueComponents({
    dts: 'src/vue-components.d.ts',
    dirs: ['src/components/**'],
    types: [
      {
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      },
    ],
    resolvers: [
      IconsResolver({
        customCollections: ['empty'],
      }),
      ArcoResolver({
        sideEffect: true,
      }),
    ],
  }),

  // https://github.com/unocss/unocss
  UnoCSS(),

  // https://github.com/unplugin/unplugin-icons
  Icons({
    compiler: 'vue3',
    autoInstall: true,
    customCollections: {
      empty: FileSystemIconLoader(
        './src/assets/empty',
      ),
    },
  }),

  // https://github.com/jpkleemans/vite-svg-loader
  SvgLoader({
    defaultImport: 'component',
    svgoConfig: {
      multipass: true,
    },
  }),
]

export default ({ mode }: ConfigEnv): UserConfig => {
  // eslint-disable-next-line node/prefer-global/process
  const root = process.cwd()
  const {
    VITE_BASE_URL,
    VITE_APP_NAME,
    VITE_APP_NAME_SHORT,
    VITE_ENABLE_DEVTOOL,
  } = loadEnv(mode, root)

  if (mode !== 'production') {
    // https://github.com/vuejs/devtools-next
    VITE_ENABLE_DEVTOOL === 'true' && plugins.push(VueDevTools())
  }

  return {
    base: VITE_BASE_URL,

    build: {
      target: 'es2015',
      sourcemap: true,
    },

    resolve: {
      alias: {
        '@': `${path.resolve(__dirname, 'src/modules')}/`,
        '~': `${path.resolve(__dirname, 'src')}/`,
        '~~': `${path.resolve(__dirname)}/`,
      },
    },

    server: {
      host: true,
      port: 3000,
    },

    esbuild: {
      pure: mode === 'production' ? ['console.log', 'debugger'] : [],
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'arcoblue-1': 'rgb(232, 240, 255)',
            'arcoblue-2': 'rgb(195, 211, 250)',
            'arcoblue-3': 'rgb(159, 182, 246)',
            'arcoblue-4': 'rgb(124, 151, 241)',
            'arcoblue-5': 'rgb(90, 120, 237)',
            'arcoblue-6': 'rgb(58, 87, 232)',
            'arcoblue-7': 'rgb(36, 57, 193)',
            'arcoblue-8': 'rgb(19, 33, 154)',
            'arcoblue-9': 'rgb(7, 14, 115)',
            'arcoblue-10': 'rgb(0, 3, 77)',
          },
          javascriptEnabled: true,
        },
      },
    },

    plugins: [
      ...plugins,

      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
        manifest: {
          name: VITE_APP_NAME,
          short_name: VITE_APP_NAME_SHORT,
          theme_color: '#0055ff',
          icons: [
            {
              src: '/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),
    ],
  }
}
