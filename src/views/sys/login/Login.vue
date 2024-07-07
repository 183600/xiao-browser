<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}__bg`">
      <img src="@/assets/images/login_bg_light.jpg" :class="`${prefixCls}__bg--light`" />
      <img src="@/assets/images/login_bg_dark.jpg" :class="`${prefixCls}__bg--dark`" />
    </div>

    <el-row :class="`${prefixCls}__inner`">
      <el-col :span="14">
        <div :class="`${prefixCls}__left`">
          <h1>
            欢迎使用
            <span>{{ title }}</span>
          </h1>
          <p>{{ title }} 基于 element plus ，并且使用了最新的 vue3, vite2, TypeScript 等主流技术开发，开箱即用的中后台前端解决方案。</p>
          <p>基于 element plus ，并且使用了最新的 vue3, vite2, TypeScript 等主流技术开发，开箱即用的中后台前端解决方案。</p>
        </div>
      </el-col>
      <el-col :span="10">
        <div :class="`${prefixCls}__right`">
          <div :class="`${prefixCls}__mode`">
            <AppDarkModeToggle v-if="!sessionTimeout" />
          </div>

          <div :class="`${prefixCls}__logo`">
            <AppLogo />
            <p>Element/Vue3/Typescript 最佳的选择</p>
          </div>
          <div :class="`${prefixCls}__form`">
            <el-tabs v-if="getShow" v-model="activeName">
              <el-tab-pane label="账号登录" name="account" />
              <el-tab-pane label="手机号登录" name="mobile" />
            </el-tabs>
            <LoginForm />
            <ForgetPasswordForm />
            <RegisterForm />
            <MobileForm />
          </div>

          <div :class="`${prefixCls}__regnew`" v-if="getShow">
            没有账号？
            <span @click="setLoginState(LoginStateEnum.REGISTER)">注册</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref, watch } from 'vue'
import { ElRow, ElCol, ElTabs, ElTabPane } from 'element-plus'
import { AppLogo } from '@/components/Application'
import { AppDarkModeToggle } from '@/components/Application'
import LoginForm from './LoginForm.vue'
import ForgetPasswordForm from './ForgetPasswordForm.vue'
import RegisterForm from './RegisterForm.vue'
import MobileForm from './MobileForm.vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useLoginState, LoginStateEnum } from './useLogin'
import { useGlobSetting } from '@/hooks/setting'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElTabs,
    ElTabPane,
    LoginForm,
    ForgetPasswordForm,
    RegisterForm,
    MobileForm,
    AppLogo,
    AppDarkModeToggle,
  },
  props: {
    sessionTimeout: {
      type: Boolean,
    },
  },
  setup() {
    const { prefixCls } = useDesign('login')
    const { setLoginState, getLoginState } = useLoginState()
    const { title } = useGlobSetting()
    const activeName = ref('account')
    const activeNameExt = {
      account: LoginStateEnum.LOGIN,
      mobile: LoginStateEnum.MOBILE,
    }

    const getShow = computed(() => {
      return unref(getLoginState) === LoginStateEnum.LOGIN || unref(getLoginState) === LoginStateEnum.MOBILE || unref(getLoginState) === LoginStateEnum.QR_CODE
    })

    watch(
      () => unref(activeName),
      (v) => {
        v && setLoginState(activeNameExt[v])
      },
    )

    return {
      prefixCls,
      title,
      setLoginState,
      getShow,
      LoginStateEnum,
      activeName,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-login';

.#{$prefix-cls} {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &__inner {
    width: 100%;
    height: 100%;
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    > img {
      display: none;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(5px) opacity(0.8) brightness(0.98);
    }
  }

  &__left {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    max-width: 80%;
    height: 100vh;
    padding: 0 2.5rem 6rem;
    color: var(--text-primary-color);

    > h1 {
      margin-bottom: 2rem;
      font-size: 3rem;
      font-weight: bold;
      letter-spacing: 2px;

      > span {
        font-family: var(--font-family-logo);
        color: var(--primary-color);
      }
    }

    > p {
      margin-bottom: 1rem;
      font-size: 16px;
    }
  }

  &__right {
    position: relative;
    height: 100vh;
    min-height: 580px;
    padding: 4rem;
    overflow: auto;
    background-color: var(--background-primary-color);
  }

  &__mode {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
  }

  &__logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 2px;
    white-space: nowrap;

    > p {
      margin: 2.5rem 0;
      font-size: 14px;
      font-weight: normal;
    }
  }

  &__form {
    max-width: 440px;
    margin: auto;

    .el-tabs__header {
      margin-bottom: 24px;
    }

    .el-tabs__nav {
      width: 100%;

      .el-tabs__item {
        width: 50%;
        text-align: center;
      }
    }

    .el-form-item {
      margin-bottom: 24px;
    }

    .el-input__inner {
      width: 100%;
      height: 44px;
      line-height: 44px;
    }
  }

  &__regnew {
    position: absolute;
    bottom: 30px;

    > span {
      color: var(--primary-color);
      cursor: pointer;
    }
  }

  .login--submit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 44px;
    padding: 0;
    margin: 1.5rem 0;
    line-height: 44px;
  }

  .login--back {
    width: 100%;
    height: 44px;
    padding: 0;
    margin: 0;
    line-height: 42px;
  }
}

html:not(.dark) {
  .#{$prefix-cls}__bg--light {
    display: block;
  }
}

html.dark {
  .#{$prefix-cls}__bg--dark {
    display: block;
  }
}
</style>
