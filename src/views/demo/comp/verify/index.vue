<template>
  <PageWrapper title="拖动校验示例">
    <div class="demo-verify-item">
      <BasicDragVerify
        ref="el1"
        isSlot
        :modelValue="verifyState"
        @end="handleCustomSuccess" />
      <el-button @click="handleBtnClick(el1, 'el1')">还原</el-button>
    </div>

    <div class="demo-verify-item">
      <BasicDragVerify ref="el2" @success="handleSuccess" circle />
      <el-button @click="handleBtnClick(el2)">还原</el-button>
    </div>

    <div class="demo-verify-item">
      <BasicDragVerify
        ref="el3"
        @success="handleSuccess"
        text="拖动以进行校验"
        successText="校验成功"
        :barStyle="{
          backgroundColor: '#018ffb',
        }" />
      <el-button @click="handleBtnClick(el3)">还原</el-button>
    </div>

    <div class="demo-verify-item">
      <BasicDragVerify ref="el4" @success="handleSuccess">
        <template #actionIcon="isPassing">
          <SvgIcon :name="isPassing ? 'moon' : 'sun'" />
        </template>
      </BasicDragVerify>
      <el-button @click="handleBtnClick(el4)">还原</el-button>
    </div>

    <div class="demo-verify-item">
      <BasicDragVerify ref="el5" @success="handleSuccess">
        <template #text="isPassing">
          <SvgIcon :name="isPassing ? 'moon' : 'sun'" class="mt-2" />
        </template>
      </BasicDragVerify>
      <el-button @click="handleBtnClick(el5)">还原</el-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
import type { DragVerifyActionType, PassingData } from '@/components/DragVerify'

import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'

import { BasicDragVerify } from '@/components/DragVerify'
import { useMessage } from '@/hooks/web/useMessage'
import { SvgIcon } from '@/components/SvgIcon'

export default defineComponent({
  components: { ElButton, BasicDragVerify, SvgIcon },
  setup() {
    const verifyState = ref(false)
    const el1 = ref<Nullable<DragVerifyActionType>>(null)
    const el2 = ref<Nullable<DragVerifyActionType>>(null)
    const el3 = ref<Nullable<DragVerifyActionType>>(null)
    const el4 = ref<Nullable<DragVerifyActionType>>(null)
    const el5 = ref<Nullable<DragVerifyActionType>>(null)

    const { createMessage } = useMessage()

    function handleSuccess(data: PassingData) {
      const { time } = data
      createMessage.success(`校验成功,耗时${time}秒`)
    }

    function handleCustomSuccess(data: PassingData) {
      const { time } = data
      verifyState.value = true
      createMessage.success(`自定义校验成功,耗时${time}秒`)
    }

    function handleBtnClick(elRef: Nullable<DragVerifyActionType>, name = '') {
      if (!elRef) {
        return
      }
      if (name === 'el1') {
        verifyState.value = false
      }
      elRef.resume()
    }

    return {
      el1,
      el2,
      el3,
      el4,
      el5,
      verifyState,
      handleCustomSuccess,
      handleSuccess,
      handleBtnClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.demo-verify-item {
  display: flex;
  margin-bottom: 24px;

  .el-button {
    height: 40px;
    margin-left: 12px;
  }
}

.demo-custom-verify {
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    width: 1.3em;
    height: 1.5em;
    margin: 0 4px;
  }

  &.is-actived {
    color: #fff;
    -webkit-text-fill-color: #fff;
  }
}
</style>
