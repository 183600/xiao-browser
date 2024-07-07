import type{ PluginOption } from 'vite'

import colors from 'picocolors'
import { readPackageJSON } from 'pkg-types'

import { getEnvConfig } from '../utils/env'

const GLOBAL_CONFIG_FILE_NAME = 'app.config.js'
const PLUGIN_NAME = 'app-config'

async function createAppConfigPlugin({
  root,
  isBuild,
}: {
  root: string;
  isBuild: boolean;
}): Promise<PluginOption> {
  let publicPath: string
  let source: string
  if (!isBuild) {
    return {
      name: PLUGIN_NAME,
    }
  }
  const { version = '', name = '' } = await readPackageJSON(root)

  return {
    name: PLUGIN_NAME,
    async configResolved(_config) {
      let appTitle = _config?.env?.VITE_GLOB_APP_TITLE ?? ''
      appTitle = appTitle.replace(/\s/g, '_')
      publicPath = _config.base
      source = await getConfigSource(appTitle)
    },
    async transformIndexHtml(html) {
      publicPath = publicPath.endsWith('/') ? publicPath : `${publicPath}/`

      const appConfigSrc = `${publicPath || '/'}${GLOBAL_CONFIG_FILE_NAME}?v=${version}-${+new Date()}}`

      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              src: appConfigSrc,
            },
          },
        ],
      }
    },
    async generateBundle() {
      try {
        this.emitFile({
          type: 'asset',
          fileName: GLOBAL_CONFIG_FILE_NAME,
          source,
        })
        console.log(colors.cyan(`✨[${name}] build successfully!`))
      } catch (error) {
        console.log(colors.red(`[${name}] build failed to package:\n${error}`))
      }
    },
  }
}

/**
 * Get the configuration file variable name
 * @param env
 */
const getVariableName = (title: string) => {
  return `__PRODUCTION__${title || '__APP'}__CONF__`.toUpperCase().replace(/\s/g, '')
}

async function getConfigSource(appTitle: string) {
  const config = await getEnvConfig()
  const variableName = getVariableName(appTitle)
  const windowVariable = `window.${variableName}`
  // Ensure that the variable will not be modified
  let source = `${windowVariable}=${JSON.stringify(config)};`
  source += `
    Object.freeze(${windowVariable});
    Object.defineProperty(window, "${variableName}", {
      configurable: false,
      writable: false,
    });
  `.replace(/\s/g, '')
  return source
}

export { createAppConfigPlugin }
