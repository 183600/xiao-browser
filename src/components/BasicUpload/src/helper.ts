import { Ref, unref, computed } from 'vue'

/**
 * 简单校验文件扩展名是否合法
 *
 * Check whether the file extension is legal
 * @param file File
 * @param accepts eg. ['png','jpg']
 */
export function checkFileExtType(file: File, accepts: string[]) {
  const newTypes = accepts.join('|')
  const reg = new RegExp(`\\.(${newTypes})$`, 'i')
  return reg.test(file.name)
}

/**
 * 检查文件名是否为图片
 *
 * Check if the filename is an image
 * @param file File
 */
export function checkImgType(file: File) {
  return isImgTypeByName(file.name)
}

/**
 * 检查文件名是否为图片
 *
 * Check if the filename is an image
 * @param name File name
 */
export function isImgTypeByName(name: string) {
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(name)
}

/**
 * 基于文件获取 Base64 内容
 *
 * Get Base64 content based on file
 * @param file File
 */
export function getBase64WithFile(file: File) {
  return new Promise<{
    result: string
    file: File
  }>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve({ result: reader.result as string, file })
    reader.onerror = (error) => reject(error)
  })
}

/**
 * 检查上传限制，并转换为帮助文本
 *
 * Check upload limit and convert to help text
 */
export function useUploadType(
  {
    acceptRef,
    helpTextRef,
    maxNumberRef,
    maxSizeRef,
  }: {
    acceptRef: Ref<string[]>
    helpTextRef: Ref<string>
    maxNumberRef: Ref<number>
    maxSizeRef: Ref<number>
  },
  uploadedList: Ref<String[]>,
) {
  /**
   * 获取可支持文件扩展名类型
   *
   * Get supported file extension types
   */
  const getAccept = computed(() => {
    const accept = unref(acceptRef)
    if (accept && accept.length > 0) {
      return accept
    }
    return []
  })

  /**
   * 更友好的显示可支持扩展名
   *
   * A friendlier display can support extensions
   */
  const getStringAccept = computed(() => {
    return unref(getAccept)
      .map((item) => {
        if (item.indexOf('/') > 0 || item.startsWith('.')) {
          return item
        } else {
          return `.${item}`
        }
      })
      .join(',')
  })

  /**
   * 上传提示帮助文本
   *
   * Upload prompt help text
   */
  const getHelpText = computed(() => {
    const helpText = unref(helpTextRef)
    if (helpText) {
      return helpText
    }
    const helpTexts: string[] = []

    const accept = unref(acceptRef)
    if (accept.length > 0) {
      helpTexts.push(`支持 ${accept.join(',')} 格式`)
    }

    const maxSize = unref(maxSizeRef)
    if (maxSize) {
      helpTexts.push(`单个文件不超过 ${maxSize} MB`)
    }

    const maxNumber = unref(maxNumberRef) - unref(uploadedList).length

    if (maxNumber && maxNumber !== Infinity) {
      helpTexts.push(`最多只能上传 ${maxNumber} 个文件`)
    }
    return helpTexts.join('，')
  })

  return { getAccept, getStringAccept, getHelpText }
}
