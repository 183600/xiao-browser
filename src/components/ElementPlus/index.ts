/*
 * @Description: Element Plus Type and Props
 */
import type { CSSProperties, ExtractPropTypes } from 'vue'

// baisc element-plus
import type {
  ButtonProps,
  ButtonType,
  ButtonNativeType,
  ColProps,
  RowProps,
  ImageProps,
  DialogProps,
  DrawerProps,
  MessageProps,
  CardProps,
  TagProps,
  PaginationProps,
  FormItemRule,
  FormRules,
  PopconfirmProps,
  TableProps,
  ElMessageBoxOptions,
  NotificationOptions,
  Action,
  FormProps,
  FormItemProps,
} from 'element-plus'

import {
  buttonProps,
  colProps,
  rowProps,
  imageProps,
  dialogProps,
  drawerProps,
  messageProps,
  cardProps,
  tagProps,
  paginationProps,
  popconfirmProps,
  notificationProps,
  descriptionProps,
  formProps,
  formItemProps,
  dropdownMenuProps,
  dropdownProps,
  dropdownItemProps,
} from 'element-plus'

export const EleButtonProps = buttonProps
export type EleButton = Partial<ButtonProps> & { btnText?: string }
export type EleButtonType = ButtonType
export type EleButtonNativeType = ButtonNativeType

export const EleColProps = colProps
export type EleCol = ColProps & { style?: CSSProperties }

export const EleRowProps = rowProps
export type EleRow = RowProps

export const EleImageProps = imageProps
export type EleImage = ImageProps

export const EleDialogProps = dialogProps
export type EleDialog = DialogProps & { class?: string; customClass?: string }

export const EleDrawerProps = drawerProps
export type EleDrawer = DrawerProps & { class?: string; customClass?: string }

export const EleMessageProps = messageProps
export type EleMessage = MessageProps

export const EleCardProps = cardProps
export type EleCard = CardProps

export const EleTagProps = tagProps
export type EleTag = TagProps

export const ElePaginationProps = paginationProps
export type ElePagination = PaginationProps

export const ElePopconfirmProps = popconfirmProps
export type ElePopconfirm = PopconfirmProps

// export const EleElMessageBoxProps = // todo
export type EleElMessageBox = ElMessageBoxOptions

export const EleNotificationProps = notificationProps
export type EleNotification = NotificationOptions

export const EleFormProps = formProps
export type EleForm = FormProps
export type EleFormRules = FormRules

export const EleFormItemProps = formItemProps
export type EleFormItem = FormItemProps
export type EleFormItemRule = FormItemRule

export const EleDropdownProps = dropdownProps
export type EleDropdown = ExtractPropTypes<typeof dropdownProps>

export const EleDropdownMenuProps = dropdownMenuProps
export type EleDropdownMenu = ExtractPropTypes<typeof dropdownMenuProps>

export const EleDropdownItemProps = dropdownItemProps
export type EleDropdownItem = ExtractPropTypes<typeof dropdownItemProps>

export const EleDescriptionsProps = descriptionProps
export type EleDescriptions = ExtractPropTypes<typeof descriptionProps>

//
// 杂项
// MISC
export type EleActionPopconfirmAction = Action

// 以下为临时方案，由于 Element Plus 未全局导出 Prop ，只能自建或通过引入组件方式定义组件 Prop
// The following is a temporary solution. Since Element Plus does not export Prop globally, it can only define component Prop by itself or by introducing components
import TableDefault from 'element-plus/lib/components/table/src/table/defaults'
import TableColumn from 'element-plus/lib/components/table/src/table-column/defaults'

export const EleTableProps = TableDefault
export type EleTable = TableProps

export const EleTableColumnProps = TableColumn
export type EleTableColumn = Partial<ExtractPropTypes<typeof TableColumn>>
