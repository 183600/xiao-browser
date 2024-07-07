import type { Ref } from 'vue'

import { ref, computed, unref } from 'vue'

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

const currentState = ref(LoginStateEnum.LOGIN)

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state
  }

  const getLoginState = computed(() => currentState.value)

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN)
  }

  return { setLoginState, getLoginState, handleBackLogin }
}

export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef)
    if (!form) return
    const data = await form.validate()
    return data as T
  }

  return { validForm }
}

export function useFormRules(formData?: Recordable) {
  const getAccountFormRule = computed(() => createRule('请输入账号'))
  const getPasswordFormRule = computed(() => createRule('请输入密码'))
  const getSmsFormRule = computed(() => createRule('请输入验证码'))

  const validatePolicy = (_, value, callback) => {
    return callback(!value ? new Error('勾选后才能注册') : null)
  }

  const validateConfirmPassword = (_, value, callback, diffField) => {
    if (!value) {
      return callback(new Error('请输入密码'))
    } else {
      if (formData && formData[diffField] === value) {
        callback()
      } else {
        return callback(new Error('两次输入密码不一致'))
      }
    }
  }

  const validateMobile = (_, value, callback) => {
    if (!value) {
      return callback(new Error('请输入手机号码'))
    } else {
      const reg = /^1[3,4,5,6,7,8,9][0-9]{9}$/
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('手机号码不正确'))
      }
    }
  }

  const getFormRules = computed(() => {
    const accountFormRule = unref(getAccountFormRule)
    const passwordFormRule = unref(getPasswordFormRule)
    const smsFormRule = unref(getSmsFormRule)

    const mobileRule = {
      sms: smsFormRule,
      mobile: [{ required: true, validator: validateMobile, trigger: 'blur' }],
    }
    switch (unref(currentState)) {
    // register form rules
    case LoginStateEnum.REGISTER:
      return {
        account: accountFormRule,
        password: passwordFormRule,
        confirmPassword: [
          {
            validator: (rule: any, value: any, callback: any) => validateConfirmPassword(rule, value, callback, 'password'),
            trigger: 'blur',
          },
        ],
        policy: [{ validator: validatePolicy, trigger: 'change' }],
        ...mobileRule,
      }

      // reset password form rules
    case LoginStateEnum.RESET_PASSWORD:
      return {
        account: accountFormRule,
        ...mobileRule,
      }

      // mobile form rules
    case LoginStateEnum.MOBILE:
      return mobileRule

      // login form rules
    default:
      return {
        account: accountFormRule,
        password: passwordFormRule,
      }
    }
  })
  return { getFormRules }
}

function createRule(message: string, trigger = 'blur') {
  return [
    {
      required: true,
      message,
      trigger,
    },
  ]
}
