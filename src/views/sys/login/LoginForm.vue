<template>
  <el-form
    v-show="getShow"
    :model="formData"
    :rules="getFormRules"
    ref="formRef">
    <el-form-item prop="account">
      <el-input v-model="formData.account" placeholder="账号 admin/tony" />
    </el-form-item>
    <el-form-item prop="password" class="mb-1">
      <el-input v-model="formData.password" placeholder="密码 123456" @keypress.enter="handleLogin" />
    </el-form-item>
    <el-row class="mt-3">
      <el-col :span="12">
        <el-checkbox v-model="rememberMe" size="small">记住我</el-checkbox>
      </el-col>
      <el-col :span="12" class="text-right">
        <el-button text @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">忘记密码?</el-button>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button
        type="primary"
        class="login--submit"
        :loading="loading"
        @click="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, unref, computed } from 'vue'
import { ElRow, ElCol, ElCheckbox, ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'
import { useMessage } from '@/hooks/web/useMessage'
import { useUserStore } from '@/store/modules/user'
import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin'

const { createNotification } = useMessage()
const userStore = useUserStore()
const { setLoginState, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)
const rememberMe = ref(false)

const formData = reactive({
  account: 'admin',
  password: '123456',
})
const { validForm } = useFormValid(formRef)
const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

async function handleLogin() {
  await validForm()

  try {
    loading.value = true
    const userInfo = await userStore.login({
      password: formData.password,
      username: formData.account,
    })
    if (userInfo) {
      createNotification({
        title: '登录成功',
        type: 'success',
        message: `欢迎回来: ${userInfo.realName}`,
        duration: 3000,
      })
    }
  } catch (error: any) {
    createNotification({
      title: '错误提示',
      type: 'error',
      message: error.message || '网络异常，请检查您的网络连接是否正常',
    })
  } finally {
    loading.value = false
  }
}
</script>
