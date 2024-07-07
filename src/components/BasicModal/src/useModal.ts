import type { UseModalReturnType, ModalInstanceMethods, BasicModalProps, ModalActionMethods, ReturnInnerMethods, UseModalInnerReturnType } from './typing'

import { ref, onUnmounted, unref, getCurrentInstance, reactive, watchEffect, nextTick, toRaw, computed } from 'vue'
import { isEqual } from 'lodash-es'
import { tryOnUnmounted } from '@vueuse/core'

import { isProdMode } from '@/utils/env'
import { error } from '@/utils/log'

const dataTransfer = reactive<any>({})

const visibleData = reactive<{ [key: number]: boolean }>({})

/**
 * 定义使用实例
 *
 * Define use instance
 */
export function useModal(): UseModalReturnType {
  const modal = ref<Nullable<ModalInstanceMethods>>(null)
  const loaded = ref<Nullable<boolean>>(false)
  const uid = ref<string>('')
  /**
   * 注册实例
   *
   * Register instance
   * @param modalMethod Modal instance
   * @param uuid Modal instance uuid
   */
  function register(modalMethod: ModalInstanceMethods, uuid: string) {
    if (!getCurrentInstance()) {
      error('useModal() can only be used inside setup() or functional components!')
    }
    uid.value = uuid

    isProdMode() &&
      onUnmounted(() => {
        modal.value = null
        loaded.value = false
        dataTransfer[unref(uid)] = null
      })

    if (unref(loaded) && isProdMode() && modalMethod === unref(modal)) return

    modal.value = modalMethod
    loaded.value = true

    modalMethod.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible
    }
  }
  /**
   * 获取实例
   *
   * Get instance
   */
  const getInstance = () => {
    const instance = unref(modal)
    if (!instance) {
      error('The modal instance has not been obtained, please make sure the instance is rendered when performing the instance operation!')
    }
    return instance
  }

  /**
   * 定义实例方法
   *
   * Define instance methods
   */
  const methods: ModalActionMethods = {
    setModalProps: (props: Partial<BasicModalProps>): void => {
      getInstance()?.setModalProps(props)
    },

    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)]
    }),

    redoModalHeight: () => {
      getInstance()?.redoModalHeight?.()
    },

    openModal: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      getInstance()?.setModalProps({
        modelValue: visible,
      })

      if (!data) return
      const id = unref(uid)
      if (openOnSet) {
        dataTransfer[id] = null
        dataTransfer[id] = toRaw(data)
        return
      }
      const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data))
      if (!equal) {
        dataTransfer[id] = toRaw(data)
      }
    },

    closeModal: () => {
      getInstance()?.setModalProps({ modelValue: false })
    },
  }
  return [register, methods]
}

/**
 * 定义内部使用实例
 *
 * Define inner use instance
 * @param callbackFn 回调方法，回调实例传递的数据
 */
export const useModalInner = (callbackFn?: Fn): UseModalInnerReturnType => {
  const modalInstanceRef = ref<Nullable<ModalInstanceMethods>>(null)
  const currentInstance = getCurrentInstance()
  const uidRef = ref<string>('')

  /**
   * 获取实例
   *
   * Get instance
   */
  const getInstance = () => {
    const instance = unref(modalInstanceRef)
    if (!instance) {
      error('useModalInner instance is undefined!')
    }
    return instance
  }

  /**
   * 注册内部实例
   *
   * Register inner instance
   * @param modalInstance Modal inner instance
   * @param uuid Modal instance uuid
   */
  const register = (modalInstance: ModalInstanceMethods, uuid: string) => {
    isProdMode() &&
      tryOnUnmounted(() => {
        modalInstanceRef.value = null
      })
    uidRef.value = uuid
    modalInstanceRef.value = modalInstance
    currentInstance?.emit('register', modalInstance, uuid)
  }

  /**
   * 定义内部实例方法
   *
   * Define inner instance methods
   */
  const methods: ReturnInnerMethods = {
    changeLoading: (loading = true) => {
      getInstance()?.setModalProps({ loading })
    },

    getVisible: computed((): boolean => {
      return visibleData[~~unref(uidRef)]
    }),

    changeConfirmLoading: (loading = true) => {
      getInstance()?.setModalProps({ confirmButton: { loading } })
    },

    closeModal: () => {
      getInstance()?.setModalProps({ modelValue: false })
    },

    setModalProps: (props: Partial<BasicModalProps>) => {
      getInstance()?.setModalProps(props)
    },

    redoModalHeight: () => {
      const callRedo = getInstance()?.redoModalHeight
      callRedo && callRedo()
    },
  }

  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)]
    if (!data) return

    if (!callbackFn || typeof callbackFn !== 'function') return

    // 回调方法，回调实例传递的数据
    // Callback method, the data passed by the callback instance
    nextTick(() => {
      callbackFn(data)
    })
  })

  return [register, methods]
}
