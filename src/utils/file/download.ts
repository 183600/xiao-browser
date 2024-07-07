import { openWindow } from '../index'
import { dataURLtoBlob, imgurlToBase64 } from './base64Conver'

/**
 * 下载远程图片到本地
 *
 * Download remote image to local
 * @param url image url
 * @param filename download name
 * @param mime image type, eg: image/png
 * @param bom
 */
// eslint-disable-next-line no-undef
export function downloadByOnlineUrl(url: string, filename: string, mime?: string, bom?: BlobPart) {
  imgurlToBase64(url).then((base64) => {
    downloadByBase64(base64, filename, mime, bom)
  })
}

/**
 * 下载 Base64 文件到本地
 *
 * Download base64 file to local
 * @param buf base64
 * @param filename download name
 * @param mime file type
 * @param bom blob info
 */
// eslint-disable-next-line no-undef
export function downloadByBase64(buf: string, filename: string, mime?: string, bom?: BlobPart) {
  const base64Buf = dataURLtoBlob(buf)
  downloadByData(base64Buf, filename, mime, bom)
}

/**
 * 根据接口URL文件流下载到本地
 *
 * Download the file stream to the local according to the interface URL
 * @param data file data
 * @param filename download name
 * @param mime file type
 * @param bom blob info
 */
// eslint-disable-next-line no-undef
export function downloadByData(data: BlobPart, filename: string, mime?: string, bom?: BlobPart) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' })
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(blob, filename)
  } else {
    const blobURL = window.URL.createObjectURL(blob)
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', filename)
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(blobURL)
  }
}

/**
 * 根据文件URL下载到本地
 *
 * Download to local according to file URL
 * @param url file url
 * @param fileName download name
 * @param target "_self" | "_blank"
 * @returns
 */
export function downloadByUrl(url: string, fileName?: string, target?: TargetContext = '_blank'): boolean {
  const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1
  const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1

  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error('Your browser does not support download!')
    return false
  }
  if (isChrome || isSafari) {
    const link = document.createElement('a')
    link.href = url
    link.target = target

    if (link.download !== undefined) {
      link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length)
    }

    if (document.createEvent) {
      const e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download'
  }

  openWindow(url, { target })
  return true
}
