import { resolve } from 'node:path'
import dayjs from 'dayjs'
import { readPackageJSON } from 'pkg-types'
import { defineConfig, loadEnv, mergeConfig, type UserConfig } from 'vite'

import { createPlugins } from './plugins'
import { createProxy } from './utils/proxy'
import { commonConfig } from './common'

interface DefineOptions {
  overrides?: UserConfig;
  options?: {};
}

function defineApplicationConfig(defineOptions: DefineOptions = {}) {
  const { overrides = {} } = defineOptions

  return defineConfig(async({ command, mode }) => {
    const root = process.cwd()
    const isBuild = command === 'build'
    const {
      VITE_SITE_BASE_PATH,
      VITE_BUILD_COMPRESS,
      VITE_DROP_CONSOLE,
      VITE_ENABLE_ANALYZE,
      VITE_PROXY_PORT,
      VITE_PROXY_ADDRESS,
      VITE_PROXY_AUTO_OPEN,
    } = loadEnv(mode, root)
    const defineData = await createDefineData(root)
    const plugins = await createPlugins({
      isBuild,
      root,
      enableAnalyze: VITE_ENABLE_ANALYZE === 'true',
      compress: VITE_BUILD_COMPRESS,
    })

    const pathResolve = (pathname: string) => resolve(root, '.', pathname)
    const applicationConfig: UserConfig = {
      base: VITE_SITE_BASE_PATH,
      resolve: {
        alias: [
          {
            find: 'vue-i18n',
            replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
          },
          // @/xxx => src/xxx
          {
            find: /@\//,
            replacement: `${pathResolve('src')}/`,
          },
          // #/xxx => types/xxx
          {
            find: /#\//,
            replacement: `${pathResolve('types')}/`,
          },
        ],
      },
      define: defineData,
      esbuild: {
        drop: VITE_DROP_CONSOLE === 'true' ? ['console', 'debugger'] : undefined,
      },
      server: isBuild ? null : {
        host: true,
        port: VITE_PROXY_PORT,
        proxy: createProxy(VITE_PROXY_ADDRESS),
        open: VITE_PROXY_AUTO_OPEN === 'true',
      },
      build: {
        target: 'es2015',
        cssTarget: 'chrome80',
        rollupOptions: {
          output: {
            manualChunks: {
              vue: ['vue', 'pinia', 'vue-router'],
              elementui: ['element-plus', '@element-plus/icons-vue'],
            },
          },
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            charset: false,
            additionalData: `@use "@/design/ele/setting.scss" as *;@use "@/design/var/config.scss" as *;`,
          },
        },
      },
      plugins,
    }

    const mergedConfig = mergeConfig(commonConfig, applicationConfig)

    return mergeConfig(mergedConfig, overrides)
  })
}

async function createDefineData(root: string) {
  try {
    const pkgJson = await readPackageJSON(root)
    const { dependencies, devDependencies, name, version } = pkgJson

    const __APP_INFO__ = {
      pkg: { dependencies, devDependencies, name, version },
      lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
    return {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    }
  } catch (error) {
    return {}
  }
}

export { defineApplicationConfig }
