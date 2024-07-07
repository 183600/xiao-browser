<template>
  <el-form
    v-if="getShow"
    :model="formData"
    :rules="getFormRules"
    ref="formRef">
    <el-form-item prop="mobile">
      <el-input v-model="formData.mobile" placeholder="手机号码" />
    </el-form-item>
    <el-form-item prop="sms">
      <countdown-input v-model="formData.sms" placeholder="短信验证码" @keypress.enter="handleLogin" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleLogin"
        :loading="loading"
        class="login--submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, unref } from 'vue'
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'
import { CountdownInput } from '@/components/CountdownInput'
import { ElNotification } from 'element-plus'
import { useLoginState, LoginStateEnum, useFormValid, useFormRules } from './useLogin'

const { getLoginState } = useLoginState()

const formRef = ref()
const loading = ref(false)

const { getFormRules } = useFormRules()
const { validForm } = useFormValid(formRef)

const formData = reactive({
  mobile: '',
  sms: '',
})

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE)

async function handleLogin() {
  const vf = await validForm()
  if (!vf) return

  try {
    loading.value = true
    ElNotification({
      title: '登录成功',
      message: '欢迎回来',
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
