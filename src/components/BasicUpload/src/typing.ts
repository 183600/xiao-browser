import { UploadApiResult } from '@/api/sys/model/uploadModel'

/**
 * 上传结果状态
 *
 * Upload result status
 */
export enum UploadResultStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  UPLOADING = 'uploading',
}

export interface FileItem {
  /**
   * 缩略图(Base64)
   *
   * Base64 thumb
   */
  thumbUrl?: string
  /**
   * 文件名称
   *
   * File name
   */
  name: string
  /**
   * 文件类型
   *
   * File type
   */
  type?: string
  /**
   * 文件大小
   *
   * File size
   */
  size: string | number
  /**
   * 文件上传进度
   *
   * File upload progress
   */
  percent: number
  /**
   * 文件
   *
   * File
   */
  file: File
  /**
   * 上传状态
   *
   * Upload status
   */
  status?: UploadResultStatus
  /**
   * 上传结果
   *
   * Upload response results
   */
  responseData?: UploadApiResult | string
  /**
   * 唯一ID
   *
   * uuid
   */
  uuid: string
}

export interface PreviewFileItem {
  /**
   * 缩略图(URL)
   *
   * Thumb url
   */
  url: string
  /**
   * 文件名称
   *
   * File name
   */
  name: string
  /**
   * 文件类型
   *
   * File type
   */
  type: string
}

export interface FileBasicColumn {
  /**
   * 表格字段
   *
   * Table prop
   */
  prop: string
  /**
   * 表格宽度
   *
   * Table width
   */
  width?: number
  /**
   * 表格标题
   *
   * Table label
   */
  label: string
  /**
   * 对齐方式
   *
   * Table align
   */
  align?: 'left' | 'right' | 'center'
  /**
   * 自定义渲染函数
   *
   * Custom render
   */
  customRender?: Fn
}
