<template>
  <el-form
    v-if="getShow"
    :model="formData"
    :rules="getFormRules"
    ref="formRef">
    <el-form-item prop="account">
      <el-input v-model="formData.account" placeholder="账号" />
    </el-form-item>
    <el-form-item prop="mobile">
      <el-input v-model="formData.mobile" placeholder="手机号码" />
    </el-form-item>
    <el-form-item prop="sms">
      <CountdownInput v-model="formData.sms" placeholder="短信验证码" />
    </el-form-item>
    <el-form-item prop="password">
      <StrengthMeter v-model="formData.password" placeholder="密码" />
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input
        v-model="formData.confirmPassword"
        placeholder="确认密码"
        clearable
        show-password />
    </el-form-item>
    <el-form-item prop="policy">
      <el-checkbox v-model="formData.policy" :checked="formData.policy">我同意xxx隐私政策</el-checkbox>
    </el-form-item>
    <el-button
      type="primary"
      class="login--submit"
      @click="handleRegister"
      :loading="loading"
      :disabled="formData.policy === false">注册</el-button>
    <el-button @click="handleBackLogin" class="login--back">返回</el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, unref, computed } from 'vue'
import { ElCheckbox, ElButton, ElForm, ElFormItem, ElInput, ElNotification } from 'element-plus'

import { StrengthMeter } from '@/components/StrengthMeter'
import { CountdownInput } from '@/components/CountdownInput'

import { useLoginState, LoginStateEnum, useFormRules, useFormValid } from './useLogin'

const { handleBackLogin, getLoginState } = useLoginState()

const formRef = ref()
const loading = ref(false)
const formData = reactive({
  account: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  sms: '',
  policy: false,
})

const { getFormRules } = useFormRules(formData)
const { validForm } = useFormValid(formRef)

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

async function handleRegister() {
  const vf = await validForm()
  if (!vf) return

  try {
    loading.value = true
    ElNotification({
      title: '注册成功',
      message: '欢迎加入',
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
