<template>
  <el-form
    :model="formData"
    :rules="getFormRules"
    v-if="getShow"
    ref="formRef">
    <el-form-item prop="account">
      <el-input v-model="formData.account" placeholder="账号" />
    </el-form-item>
    <el-form-item prop="mobile">
      <el-input v-model="formData.mobile" placeholder="手机号码" />
    </el-form-item>
    <el-form-item prop="sms">
      <CountdownInput v-model="formData.sms" placeholder="短信验证码" @keypress.enter="handleReset" />
    </el-form-item>
    <el-form-item class="enter-x">
      <el-button
        type="primary"
        class="login--submit"
        @click="handleReset"
        :loading="loading">重置</el-button>
      <el-button class="login--back" @click="handleBackLogin">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, unref } from 'vue'
import { ElNotification, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { CountdownInput } from '@/components/CountdownInput'
import { useLoginState, LoginStateEnum, useFormRules, useFormValid } from './useLogin'

const { handleBackLogin, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)
const { validForm } = useFormValid(formRef)

const formData = reactive({
  account: '',
  mobile: '',
  sms: '',
})

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD)

async function handleReset() {
  const vf = await validForm()
  if (!vf) return

  try {
    loading.value = true
    ElNotification({
      title: '操作成功',
      type: 'success',
    })
  } catch (error: any) {
    ElNotification({
      title: '错误提示',
      message: error.message || '网络异常，请检查您的网络连接是否正常',
      type: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>
