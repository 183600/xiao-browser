/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite'
type ProxyItem = [string, string]
type ProxyTargetList = Record<string, ProxyOptions>

/**
 * Generate proxy
 * @param list
 */
export function createProxy(listStr: string) {
  let list: ProxyItem[] = []
  try {
    list = JSON.parse(listStr)
  } catch (error) {
    console.error('proxy address error: ', error)
  }
  const ret: ProxyTargetList = {}
  for (let i = 0; i < list.length; i++) {
    const [prefix, target] = list[i]
    const isHttps = /^https:\/\//.test(target)

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    }
  }
  return ret
}
