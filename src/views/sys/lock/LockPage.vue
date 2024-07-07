<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}__unlock`" @click="handleShowForm(false)" v-show="showDate">
      <SvgIcon name="lock" :size="32" />
      <span>点击解锁</span>
    </div>

    <div :class="`${prefixCls}__box`">
      <div :class="`${prefixCls}__hour`">
        <span>{{ hour }}</span>
        <span v-show="showDate" class="meridiem">
          {{ meridiem }}
        </span>
      </div>
      <div :class="`${prefixCls}__minute`">
        <span>{{ minute }}</span>
      </div>
    </div>

    <transition name="fade-slide">
      <div :class="`${prefixCls}-entry`" @click="handleShowForm(true)" v-show="!showDate">
        <div :class="`${prefixCls}-entry-content`" @click.stop="">
          <div :class="`${prefixCls}-entry__header`">
            <img :src="userinfo.avatar || headerImg" />
            <p>{{ userinfo.realName }}</p>
          </div>
          <div :class="`${prefixCls}-entry__input`">
            <el-input
              v-model="password"
              type="password"
              placeholder="请输入锁屏密码或者用户密码"
              @keypress.enter="unLock()" />
            <SvgIcon :name="loading ? 'loading' : 'right'" :spin="loading" />
          </div>
          <div :class="`${prefixCls}-entry__extra`" @click="goLogin">
            <el-tooltip content="返回登录">
              <SvgIcon :size="32" name="poweroff" />
            </el-tooltip>
          </div>
        </div>
      </div>
    </transition>

    <div :class="`${prefixCls}__date`">
      <div v-show="!showDate">
        {{ hour }}:{{ minute }}
        <span>{{ meridiem }}</span>
      </div>
      <div>{{ year }}/{{ month }}/{{ day }} {{ week }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElInput, ElTooltip } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { useLockStore } from '@/store/modules/lock'
import { useNow } from './useNow'
import { useDesign } from '@/hooks/web/useDesign'
import headerImg from '@/assets/images/header.jpg'
import { useMessage } from '@/hooks/web/useMessage'
import { SvgIcon } from '@/components/SvgIcon'

const password = ref('')
const loading = ref(false)
const showDate = ref(true)

const { prefixCls } = useDesign('lock-page')
const lockStore = useLockStore()
const userStore = useUserStore()
const { createMessage } = useMessage()

const { hour, month, minute, meridiem, year, day, week } = useNow(true)

const userinfo = computed(() => {
  return userStore.getUserInfo || {}
})

async function unLock() {
  if (!password.value) {
    return
  }
  const pwd = password.value
  try {
    loading.value = true
    const res = await lockStore.unLock(pwd)
    !res && createMessage.error('锁屏密码错误')
  } finally {
    loading.value = false
  }
}

function goLogin() {
  userStore.logout(true)
  lockStore.resetLockInfo()
}

function handleShowForm(show = false) {
  showDate.value = show
}
</script>

<style lang="scss" scoped>
$prefix-cls: '#{$tonyname}-lock-page';

.#{$prefix-cls} {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;

  &__unlock {
    position: absolute;
    top: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    color: rgba(255, 255, 255, 0.85);
    text-align: center;
    cursor: pointer;
    transition: all 0.5s linear;
    animation: sectimer 1s ease-in infinite;

    &:hover {
      color: rgba(255, 255, 255, 0.95);
      animation: none;
    }
  }

  &__box {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  &__hour,
  &__minute {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48%;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.65);
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 30px;

    @media only screen and (width <= 767px) {
      span:not(.meridiem) {
        font-size: 160px;
      }
    }
    @media only screen and (width >= 768px) {
      span:not(.meridiem) {
        font-size: 160px;
      }
    }
    @media only screen and (width >= 992px) {
      span:not(.meridiem) {
        font-size: 220px;
      }
    }
    @media only screen and (width >= 1200px) {
      span:not(.meridiem) {
        font-size: 260px;
      }
    }
    @media only screen and (width >= 1920px) {
      span:not(.meridiem) {
        font-size: 320px;
      }
    }

    .meridiem {
      position: absolute;
      top: 24px;
      left: 24px;
    }
  }

  &__date {
    position: absolute;
    bottom: 12px;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.85);
    text-align: center;

    > div:first-child {
      font-size: 36px;
    }
  }

  &-entry {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);

    &-content {
      width: 320px;
    }

    &__header {
      text-align: center;

      > img {
        width: 120px;
        margin: 0 auto;
        border-radius: 50%;
      }

      > p {
        margin: 8px 0 12px;
        font-size: 18px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.65);
      }
    }

    &__input {
      position: relative;
      margin: 16px 0;

      > span {
        position: absolute;
        top: calc(50% - 8px);
        right: 16px;
        z-index: -1;
        width: 16px;
        color: rgba(255, 255, 255, 0.75);
      }

      .el-input {
        --el-input-height: 48px;
      }

      :deep(.el-input__wrapper) {
        --el-input-bg-color: transparent;
        --el-input-border-color: #888;
      }

      :deep(.el-input__inner) {
        --el-input-text-color: rgba(255, 255, 255, 1);
      }
    }

    &__extra {
      position: absolute;
      top: 30px;
      right: 30px;
      color: rgba(255, 255, 255, 0.55);
      cursor: pointer;

      &:hover {
        color: rgba(255, 255, 255, 0.95);
      }
    }
  }
}
@keyframes sectimer {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
