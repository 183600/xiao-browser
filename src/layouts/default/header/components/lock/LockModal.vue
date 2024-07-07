<template>
  <BasicModal
    title="锁定屏幕"
    @register="register"
    :width="600"
    :showFooter="false"
    :class="prefixCls">
    <div :class="`${prefixCls}__entry`">
      <div :class="`${prefixCls}__header`">
        <img :src="avatar" :class="`${prefixCls}__header-img`" />
        <p :class="`${prefixCls}__header-name`">
          {{ getRealName }}
        </p>
      </div>

      <BasicForm @register="registerForm" />

      <div :class="`${prefixCls}__footer`">
        <ElButton type="primary" class="mt-2" @click="handleLock">锁定</ElButton>
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElButton } from 'element-plus'

import { useDesign } from '@/hooks/web/useDesign'
import { BasicModal, useModalInner } from '@/components/BasicModal'
import { useUserStore } from '@/store/modules/user'
import { useLockStore } from '@/store/modules/lock'
import { BasicForm, useForm } from '@/components/BasicForm'

import headerImg from '@/assets/images/header.jpg'

export default defineComponent({
  name: 'LockModal',
  components: { ElButton, BasicModal, BasicForm },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { prefixCls } = useDesign('header-lock-modal')
    const userStore = useUserStore()
    const lockStore = useLockStore()

    const getRealName = computed(() => userStore.getUserInfo?.realName)
    const [register, { closeModal }] = useModalInner()

    const [registerForm, { validateField, resetFields, getFieldsValue }] = useForm({
      showActionButtonGroup: false,
      colProps: {
        span: 24,
      },
      schemas: [
        {
          field: 'password',
          label: '',
          component: 'ElInput',
          componentProps: {
            type: 'password',
            placeholder: '锁屏密码',
          },
          required: true,
        },
      ],
    })

    async function handleLock() {
      await validateField()
      const values = getFieldsValue() as any
      const password: string | undefined = values.password
      closeModal()

      lockStore.setLockInfo({
        isLock: true,
        pwd: password,
      })
      await resetFields()
    }

    const avatar = computed(() => {
      const { avatar } = userStore.getUserInfo
      return avatar || headerImg
    })

    return {
      prefixCls,
      getRealName,
      register,
      registerForm,
      avatar,
      handleLock,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-header-lock-modal';

.#{$prefix-cls} {
  &__entry {
    position: relative;
    max-width: 600px;
    padding: 130px 30px 30px;
    margin: 0 auto;
    border-radius: 10px;

    .el-form-item__label {
      display: none;
    }

    .el-input {
      width: 100%;
    }

    .el-button {
      width: 100%;
    }
  }

  &__header {
    position: absolute;
    top: 0;
    left: calc(50% - 45px);
    width: auto;
    text-align: center;

    &-img {
      width: 70px;
      border-radius: 50%;
    }

    &-name {
      margin-top: 5px;
    }
  }
}
</style>
