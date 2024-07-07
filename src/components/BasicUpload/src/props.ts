import { FileBasicColumn } from './typing'

export const uploadProps = {
  /**
   * 上传函数方法
   *
   * Upload api function
   */
  api: {
    type: Function as PropType<PromiseFn>,
    default: null,
    required: true,
  },
  /**
   * 上传文件接收的参数名，如 `filename: (binary)` 中的 `filename`，就是填写这个
   *
   * The parameter name received by the uploaded file, such as `filename` in `filename: (binary)`, is to fill in this
   */
  uploadName: {
    type: String,
    default: 'file',
    required: true,
  },
  /**
   * 上传按钮左侧用户提示文本
   *
   * Tips on the left side of the upload button
   */
  helpText: {
    type: String,
    default: '',
  },
  /**
   * 单个文件最大支持多少(MB)
   *
   * Maximum supported file size (MB)
   */
  maxSize: {
    type: Number,
    default: 2,
  },
  /**
   * 单次最大支持上传数量， Infinity 为不限制
   *
   * Supports the maximum number of files at a time Infinity is not limited
   */
  maxNumber: {
    type: Number,
    default: Infinity,
  },
  /** 限制上传格式，可使用文件后缀名(点号可选)或MIME字符串，如 ['.doc,','application/msword','image/*']
   * upload support file accept. for example ['.doc,','application/msword','image/*']
   */
  accept: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /**
   * 是否多选
   *
   * Whether to choose multiple
   */
  multiple: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否禁用上传
   *
   * whether to disable
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 上传文件时携带的额外参数
   *
   * Additional parameters to carry when uploading files
   */
  uploadParams: {
    type: Object as PropType<Recordable>,
    default: {},
  },
}

export const fileListProps = {
  /**
   * 文件数据列
   *
   * File columns
   */
  columns: {
    type: Array as PropType<FileBasicColumn[]>,
    default: null,
  },
  /**
   * 文件操作列
   *
   * File action column
   */
  actionColumn: {
    type: Object as PropType<FileBasicColumn>,
    default: null,
  },
  /**
   * 文件数据
   *
   * File data list
   */
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
}

export const customProps = {
  /**
   * 已上传的文件列表内容
   *
   * Upload list default content
   */
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /**
   * 是否显示上传预览(多图预览第一张)
   *
   * Whether to display the upload preview (the first picture of the multi-picture preview)
   */
  showThumb: {
    type: Boolean,
    default: false,
  },
  /**
   * 缩略图尺寸(px)
   *
   * Thumb size(px)
   */
  thumbSize: {
    type: Number,
    default: 200,
  },
  /**
   * 是否显示预览
   *
   * Whether the preview button
   */
  showPreview: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示预览数量
   *
   * Whether the upload button shows the number
   */
  showPreviewNumber: {
    type: Boolean,
    default: true,
  },
  /**
   * 为空时，是否隐藏预览按钮
   *
   * Whether to hide the preview button when empty
   */
  emptyHidePreview: {
    type: Boolean,
    default: false,
  },
}

export const basicProps = {
  ...uploadProps,
  ...customProps,
}
