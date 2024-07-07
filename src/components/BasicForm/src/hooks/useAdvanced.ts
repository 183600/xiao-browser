import type { ComputedRef, Ref } from 'vue'
import type { EleCol } from '@/components/ElementPlus'
import type { BasicFormProps, BasicFormSchema, AdvanceState } from '../typing'

import { unref, watch } from 'vue'

import { useBreakpoint } from '@/hooks/event/useBreakpoint'

import { BASIC_COL_LEN, BASIC_COL_SIZE } from '../const'

interface UseAdvancedContext {
  advanceState: AdvanceState
  emit: EmitType
  getProps: ComputedRef<BasicFormProps>
  getSchema: ComputedRef<BasicFormSchema[]>
  formModel: Recordable
  defaultValueRef: Ref<Recordable>
}

/**
 * 处理展开/收起
 *
 * Handle Expand/Collapse Information
 */
export function useAdvanced({ advanceState, emit, getProps, getSchema, formModel, defaultValueRef }: UseAdvancedContext) {
  const { realWidthRef, screenEnum } = useBreakpoint()
  let firstLoad = false

  /**
   * 获取展开/收起信息
   *
   * Get Expand/Collapse Information
   * @param itemCol EleCol
   * @param itemColSum
   */
  function getAdvanced(itemCol: Partial<EleCol>, itemColSum = 0) {
    const width = unref(realWidthRef)

    // 默认列宽
    // Default col size
    const mdWidth = parseInt(itemCol.md) || parseInt(itemCol.xs) || parseInt(itemCol.sm) || parseInt(itemCol.span) || BASIC_COL_SIZE

    // 尝试查找是否存在自定义列宽
    // Try to find if there is a custom column width
    const lgWidth = parseInt(itemCol.lg) || mdWidth
    const xlWidth = parseInt(itemCol.xl) || lgWidth
    const xxlWidth = parseInt(itemCol.xxl) || xlWidth

    if (width <= screenEnum.LG) {
      itemColSum += mdWidth
    } else if (width < screenEnum.XL) {
      itemColSum += lgWidth
    } else if (width < screenEnum.XXL) {
      itemColSum += xlWidth
    } else {
      itemColSum += xxlWidth
    }

    const { alwaysShowLines = 1 } = unref(getProps)
    if (itemColSum >= BASIC_COL_LEN * alwaysShowLines) {
      let alwayShow = false

      // 恰好第一行是满行时候的处理
      // It happens that the first line is the processing of the full line
      if (!firstLoad) {
        firstLoad = true
        alwayShow = itemColSum === BASIC_COL_LEN
      }

      return { isAdvanced: alwayShow || advanceState.isAdvanced, itemColSum }
    } else {
      // 始终显示第一行
      // The first line is always displayed
      firstLoad = true
      return { isAdvanced: true, itemColSum }
    }
  }

  /**
   * 更新展开/收起信息
   *
   * Update Expand/Collapse
   */
  function updateAdvanced() {
    let itemColSum = 0
    let realItemColSum = 0
    const { colProps = {}, actionColProps = {} } = unref(getProps)
    const baseColProps = colProps
    let isAdvancedRes = false

    for (const schema of unref(getSchema)) {
      const { show, colProps } = schema
      let isShow = true

      if (typeof show === 'boolean') {
        isShow = show
      }

      if (typeof show === 'function') {
        isShow = show({
          schema: schema,
          model: formModel,
          field: schema.field,
          values: {
            ...unref(defaultValueRef),
            ...formModel,
          },
        })
      }

      if (isShow && (colProps || baseColProps)) {
        const { itemColSum: sum, isAdvanced } = getAdvanced({ ...baseColProps, ...colProps }, itemColSum)

        itemColSum = sum || 0
        if (isAdvanced) {
          realItemColSum = itemColSum
        }
        schema.isAdvanced = isAdvanced
        isAdvancedRes = isAdvanced
        const actSpan = actionColProps?.span || BASIC_COL_SIZE

        advanceState.showAdvanced = itemColSum + actSpan > BASIC_COL_LEN
      }
    }

    advanceState.actionSpan = realItemColSum % BASIC_COL_LEN

    emit('advanced-change', isAdvancedRes)
  }

  /**
   * 切换展开/收起
   *
   * Toggle Expand/Collapse
   */
  function handleToggleAdvanced() {
    advanceState.isAdvanced = !advanceState.isAdvanced
  }

  watch(
    [() => unref(getSchema), () => advanceState.isAdvanced, () => unref(realWidthRef)],
    () => {
      const { showAdvancedButton } = unref(getProps)
      if (showAdvancedButton) {
        updateAdvanced()
      }
    },
    { immediate: true },
  )

  return { handleToggleAdvanced }
}
