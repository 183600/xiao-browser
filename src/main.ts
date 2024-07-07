// Register icon sprite
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/src/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import { initAppConfigStore } from '@/logics/initAppConfig'
import { setupErrorHandle } from '@/logics/error-handle'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'
import { setupStore } from '@/store'
import { setupGlobDirectives } from '@/directives'
import { registerGlobComp } from '@/components/registerGlobComp'
import '@/design/util.scss'
import '@/design/index.scss'
// import { ElLoading } from 'element-plus'

async function bootstrap() {
  const app = createApp(App)

  // 配置 store
  // Configure store
  setupStore(app)

  // 初始化内部系统配置
  // Initialize internal system configuration
  initAppConfigStore()

  // 注册全局组件
  // Register global components
  registerGlobComp(app)

  // 配置路由
  // Configure routing
  setupRouter(app)

  // router-guard
  setupRouterGuard(router)

  // 注册全局指令
  // Register global directive
  setupGlobDirectives(app)

  // 配置全局错误处理
  // Configure global error handling
  setupErrorHandle(app)

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  // Register global element plus
  // 不建议，项目已经按需引入
  // Not recommended, the project has been introduced on demand
  // app.use(ElementPlus)
  // 如果需要 v-loading 用法，则需引入下面内容
  // If you need v-loading usage, you need to introduce the following content
  // app.use(ElLoading)

  app.mount('#app')
}

bootstrap()
