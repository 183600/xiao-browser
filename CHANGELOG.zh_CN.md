## [0.7.1](https://github.com/crlang/vue-tony-admin/compare/0.6.1...0.7.1) (2023-05-23)

## Breaking changes

- 升级至 Vite4，调整打包方式，提升了 2.2 倍打包速度，提升了 3.1 倍加载速度
- 由 yarn 迁移至 pnpm，更好的依赖处理

### Bug Fixes

- 修复上传提示错误 ([dca617c](https://github.com/crlang/vue-tony-admin/commit/dca617ce00fe36e65d65e73b71e1cf6a7895d20f))
- 修复 bug、useMessage 支持 closeAll 方法 ([d0cc3b8](https://github.com/crlang/vue-tony-admin/commit/d0cc3b8c9e6e1250d5fd6a5f83e4cb120cad73ec))
- 移除 useMessage 内容字段 content，保留 message 作为内容展示 ([6c31085](https://github.com/crlang/vue-tony-admin/commit/6c310859b1c1914f41d51b36504a921feb4f6b49))
- **BasicTable:** 新增列默认排序配置 ([67289b3](https://github.com/crlang/vue-tony-admin/commit/67289b3165e810ca215f9fdadc71f88fdf127c9a))
- **BasicUpload:** 修复返回值未能根据全局配置返回 ([ae48396](https://github.com/crlang/vue-tony-admin/commit/ae483964bbad14924b2f1787a8d4ca71d3c87382))
- **BasicUpload:** 优化无数据及已上传数量的提示 ([4ea5488](https://github.com/crlang/vue-tony-admin/commit/4ea5488e0d0f9951484403195dda48a8c922635b))

### Features

- **BasicForm:** 支持 ElTreeSelect 组件，修复校验规则错误 ([c31564d](https://github.com/crlang/vue-tony-admin/commit/c31564dd0058cd68d000eed56ce554619dc1d84a))

## [0.6.1](https://github.com/crlang/vue-tony-admin/compare/0.6.0...0.6.1) (2023-04-03)

### Bug Fixes

- 优化类型定义 ([3fdeff4](https://github.com/crlang/vue-tony-admin/commit/3fdeff4a26fe9504233ed72cb7f67100eb884e28))
- 优化 logo、help 组件界面 ([62bc8d1](https://github.com/crlang/vue-tony-admin/commit/62bc8d1f1cdd6fc3f6f878bd6c1e6d930504ba43))

### Features

- 升级 Element Plus 版本至最新版 2.3.2 ([3a4c91a](https://github.com/crlang/vue-tony-admin/commit/3a4c91a00fee619b851edbcdb31468e5d3419c68))
- **BasicTable:** 新增 defaultValue 属性，列表项不存在时显示其默认值 ([b8ff761](https://github.com/crlang/vue-tony-admin/commit/b8ff76173f0d280dba84a80bbf67c0389968302f))

# [0.6.0](https://github.com/crlang/vue-tony-admin/compare/0.5.7...0.6.0) (2023-03-15)

### Bug Fixes

- **Icon:** 调整 size 支持字符串输入 ([1e28f50](https://github.com/crlang/vue-tony-admin/commit/1e28f507e314acd162e5e199bb0a373d5e26b51e))
- **SvgIcon:** 调整 size 支持字符串输入 ([44d95e9](https://github.com/crlang/vue-tony-admin/commit/44d95e92aaf9a9091a56dc42cb0c4d45f099e1ad))

### Features

- 升级 Element Plus 版本至最新版 2.3.0、升级 Vite 版本至 3.2.5、及其它依赖升级最新版 ([9ccd2e1](https://github.com/crlang/vue-tony-admin/commit/9ccd2e1610b831be119677eb93fb21b6aabc1126))

## [0.5.7](https://github.com/crlang/vue-tony-admin/compare/0.5.6...0.5.7) (2022-12-01)

### Bug Fixes

- 功能优化、移除部分钩子 ([2e2ce42](https://github.com/crlang/vue-tony-admin/commit/2e2ce42ad5f917466de9d1f1e1a495db6c3594ee))
- 头部组件内容优化 ([721c268](https://github.com/crlang/vue-tony-admin/commit/721c268d1bb9a15bac6e683c9131e54ee10bc228))
- 修复页面动画引起的滚动条波动 ([79c07e8](https://github.com/crlang/vue-tony-admin/commit/79c07e806d804a14372d78b0d74c4e3a59164eb0))
- 修复页面过渡动画失效 ([c029661](https://github.com/crlang/vue-tony-admin/commit/c029661bd85fa0ca80cc1e90dda6ad6c0bec5516))
- 移除 effect proptype ([bb7afed](https://github.com/crlang/vue-tony-admin/commit/bb7afed127a6a906041ac89ff553af772e634217))
- 优化图标统一视觉，调整系统的图标为 svg，调整 iconify 图标示例为 ep 图标库 ([9f112e4](https://github.com/crlang/vue-tony-admin/commit/9f112e4b6996e7712a6dfb25a63a32955a4e30e3))
- 主题色更改规则更新，支持 CSS 或 JS 动态更新 ([362e8e9](https://github.com/crlang/vue-tony-admin/commit/362e8e91a59efd2dd7b544f77db40d698c87f77a))
- **BasicTable:** 调整设置的 fullScreen 字段为 fullscreen ([9246a6d](https://github.com/crlang/vue-tony-admin/commit/9246a6d0e89b8714a5e9f295c383604913ee5a03))
- demo 示例更新 ([52ba203](https://github.com/crlang/vue-tony-admin/commit/52ba20377c71f95d2e4e47537c34dda55a189a6e))
- **IconPicker:** 优化显示效果 ([c51f4ed](https://github.com/crlang/vue-tony-admin/commit/c51f4edacdd2f00dac906bab647f2e4e440318f4))
- **SvgIcon:** 调整 size、rotate 限制为数值 ([d92d655](https://github.com/crlang/vue-tony-admin/commit/d92d655d3fcd04460f22f05192b4d29ce76f7f31))

### Features

- **Icon:** 支持引入本地 svg 图标 ([7fcaefa](https://github.com/crlang/vue-tony-admin/commit/7fcaefad50f1df2389ed2eea10b3baa194a0ed11))

## [0.5.6](https://github.com/crlang/vue-tony-admin/compare/0.5.5...0.5.6) (2022-10-21)

### Bug Fixes

- 修复菜单拖动后拖动条消失、修复顶部菜单无法动态对齐 ([8fb569f](https://github.com/crlang/vue-tony-admin/commit/8fb569ff070cf8630c79b2e649353433e86945b9))
- 修复锁屏输入空白 ([4217c2d](https://github.com/crlang/vue-tony-admin/commit/4217c2db1b44c7cbfe38b8efedfda85f3336a079))
- 修复 undefined 引起的错误 ([e8fb534](https://github.com/crlang/vue-tony-admin/commit/e8fb53421e5505c4828a3af37cbd7ab0f73fe934))
- 移除 is 判断 ([4fb1f24](https://github.com/crlang/vue-tony-admin/commit/4fb1f246d50305b0dab386aa6a3ad3a09b16f57c))
- 优化更友好的项目配置区域 ([87219cc](https://github.com/crlang/vue-tony-admin/commit/87219cc9ef11e484457879cac11c3b3003e85ab9))
- isObject 改为 @vueuse/core 调用能达到更好的判断效果 ([cb9a325](https://github.com/crlang/vue-tony-admin/commit/cb9a325af6638c44c5899cc19d74b024ac71e26c))

### Features

- 新增可配置动态头部按钮 ([01498d7](https://github.com/crlang/vue-tony-admin/commit/01498d7b7661fc9b0bca67f14ebf925cbb4712ed))
- 新增项目配置按钮开关 ([95f43e6](https://github.com/crlang/vue-tony-admin/commit/95f43e6df6b1fa24ab43651fb2c080cfe7719b76))

## [0.5.5](https://github.com/crlang/vue-tony-admin/compare/0.5.4...0.5.5) (2022-08-21)

### Bug Fixes

- 调整颜色及暗黑模式的处理方式 ([d41fafe](https://github.com/crlang/vue-tony-admin/commit/d41fafe11bc9e28e0622a1e2b405cfda9b591a99))
- 修复兼容性问题 ([258f1ae](https://github.com/crlang/vue-tony-admin/commit/258f1aecfb1e1b93e49952373698df08feffdf46))
- 修复 tabs 跳动问题 ([40122af](https://github.com/crlang/vue-tony-admin/commit/40122af79bf91a0776518d607373785ca0102778))
- 移除菜单非必要的字段 ([4444383](https://github.com/crlang/vue-tony-admin/commit/444438386ae4eb2e74db1ac98cb14f8b74953a1b))
- 重命名组件以避免与 HTML 元素名相同 ([8656842](https://github.com/crlang/vue-tony-admin/commit/86568421dca6e7e6c850a71c1a2b81dcb1125bce))
- **BasicTable:** 修复部分属性失去活性问题 ([0749968](https://github.com/crlang/vue-tony-admin/commit/0749968bb507b9a5507aa97617d44e32929ef9b4))

### Features

- 将项目切换为默认中文语言输出 ([13faa98](https://github.com/crlang/vue-tony-admin/commit/13faa98e5daf7414c4f302e1769f7c4718bb08ec))
- 新增头部菜单模块 ([bc3e3be](https://github.com/crlang/vue-tony-admin/commit/bc3e3bea7f97540e130bfc4066e061092acfc4f6))
- 新增重构后的黑暗模式 ([87307b6](https://github.com/crlang/vue-tony-admin/commit/87307b6b43fd9b7bdff8ff245a1131c20b4cb563))
- **BasicButton:** 重命名 Button 为 BasicButton ([c0640ad](https://github.com/crlang/vue-tony-admin/commit/c0640adeec1b050dc4c86566fc836e6d567f771a))
- **RelativeTime:** 重命名 Time 为 RelativeTime ([221a1eb](https://github.com/crlang/vue-tony-admin/commit/221a1ebe9879cb47b5a59934ee5873ba6bc81d5d))

## [0.5.4](https://github.com/crlang/vue-tony-admin/compare/0.5.3...0.5.4) (2022-07-21)

### Bug Fixes

- 修复图标依赖包名称变更 ([beeb355](https://github.com/crlang/vue-tony-admin/commit/beeb355cca86c7a9beb6b273e90a4dbb97e1a336))
- 修复 log 的彩色问题 ([c013748](https://github.com/crlang/vue-tony-admin/commit/c013748a968bdede80738691eb97c60eae0398b4))
- 移除 vue 已全局定义的内容 ([767d4b2](https://github.com/crlang/vue-tony-admin/commit/767d4b28320818bb454b6eac36b5647ddbfc8ca3))
- **BasicDescription:** 移除 style 引起的编辑器着色 ([9804128](https://github.com/crlang/vue-tony-admin/commit/9804128f888d41dd7dde6ae27b304b02289db239))
- **BasicForm:** 修复无法控制操作按钮组 ([d6180dd](https://github.com/crlang/vue-tony-admin/commit/d6180dddc68bbaa7a23b6274064bb8440fb74008))

### Features

- **BasicTable:** 新增是否显示盒子阴影属性 ([5bdb817](https://github.com/crlang/vue-tony-admin/commit/5bdb8174f13e067ad1a7a9acaf4b59d764ac9229))
- **BasicUpload:** 新增上传配置修复上传文件字段引起的安全警告 ([f2111af](https://github.com/crlang/vue-tony-admin/commit/f2111afb9b782291b1fcdee7ca357bd71b58aace))
- **PageWrapper:** 新增是否继承路由标题，优化页面标题显示，默认继承路由标题 ([811fe55](https://github.com/crlang/vue-tony-admin/commit/811fe557118a6d21f5f36b8a547b5899a37b98cc))

## [0.5.3](https://github.com/crlang/vue-tony-admin/compare/0.5.2...0.5.3) (2022-07-11)

### Bug Fixes

- 修复未定义问题 ([71e3f29](https://github.com/crlang/vue-tony-admin/commit/71e3f29ea8126800d811fe9cebee063b5dacaba4))

### Features

- **useMessage:** 新增 message 选项，作用兼同 content ([bf698d2](https://github.com/crlang/vue-tony-admin/commit/bf698d25f033490a6dd09ee19e2c1c63a4b5f4a3))

## [0.5.2](https://github.com/crlang/vue-tony-admin/compare/0.5.1...0.5.2) (2022-07-08)

### Bug Fixes

- Fixed interface issues caused by Element Plus version upgrades ([7dc6abc](https://github.com/crlang/vue-tony-admin/commit/7dc6abcbecebc0ad09dfa21417811169c3fe0120))
- **BasicModal:** hide the x-axis scrollbar ([3aa83eb](https://github.com/crlang/vue-tony-admin/commit/3aa83eb88a1e316cda35ba8ccd86bbd6dc95ba87))
- **BasicTable:** Adjust the default width of the action column to 150, fix the icon cannot be displayed ([9497c0c](https://github.com/crlang/vue-tony-admin/commit/9497c0c5ac0e0fb66082d958f4083ef0bcda4002))
- **BasicTable:** Optimize undefined code ([7e1865e](https://github.com/crlang/vue-tony-admin/commit/7e1865ee469400c870a4539862f783730c694b2a))

### Features

- Upgrade Element Plus version to latest version 2.2.9 ([30fd87c](https://github.com/crlang/vue-tony-admin/commit/30fd87cf84aae2fda89ef107f3119dab54ebf30d))
- **BasicForm:** Add automatic judgment whether to display the expand button ([f12ad88](https://github.com/crlang/vue-tony-admin/commit/f12ad882e484a8049314392d94ce4c954b1db872))

### Reverts

- Optimize login exceptions and withdraw some adjustments ([ccc0e07](https://github.com/crlang/vue-tony-admin/commit/ccc0e075ad2f7a719b6fe9c2b1452caada1a5640))

## [0.5.1](https://github.com/crlang/vue-tony-admin/compare/0.5.0...0.5.1) (2022-07-04)

### Performance

- 删除一些不必要的处理文件 ([0878b99](https://github.com/crlang/vue-tony-admin/commit/0878b995cb82622925038ff40c91d35a1e11642d))

# [0.5.0](https://github.com/crlang/vue-tony-admin/compare/0.3.1...0.5.0) (2022-07-01)

### Features

- 新增 PageWrapper 为全局组件，移除 Button 全局组件 ([6bbeb43](https://github.com/crlang/vue-tony-admin/commit/6bbeb4383e0da680056891ebffa989748cb804f8))
- **ApiSelect:** 新增组件及文档 ([3c4d0f6](https://github.com/crlang/vue-tony-admin/commit/3c4d0f6c23cd5683532cb91d2ab8fb8adc0c345c))
- **CountdownInput:** 新增组件及文档 ([6cb9ca4](https://github.com/crlang/vue-tony-admin/commit/6cb9ca4d5613693dff4a2c234f6e3b87729082b3))

### Refactors

- **PageWrapper:** 重构组件及文档 ([6bbeb43](https://github.com/crlang/vue-tony-admin/commit/6bbeb4383e0da680056891ebffa989748cb804f8))
- **Icon:** 重构组件及文档 ([06f1027](https://github.com/crlang/vue-tony-admin/commit/06f102794dbd9539bd2c5c4eb229e93b9229345a))
- **SvgIcon:** 重构组件及文档 ([06f1027](https://github.com/crlang/vue-tony-admin/commit/06f102794dbd9539bd2c5c4eb229e93b9229345a))
- **ClickOutside:** 重构组件及文档 ([5008d97](https://github.com/crlang/vue-tony-admin/commit/5008d976b5b4931f7eb985e3e57150a278fa3aaf))
- **useDesign:** 重构方法及文档 ([0cba00b](https://github.com/crlang/vue-tony-admin/commit/0cba00bbd242f192b96bcb29fbe02fac051f993f))
- **IconPicker:** 重构组件及文档 ([a6c6e8d](https://github.com/crlang/vue-tony-admin/commit/a6c6e8de6f5b2b9a0d728b991ffb3ffe455632a8))
- **CollapseContainer:** 重构组件及文档([eb30b4e](https://github.com/crlang/vue-tony-admin/commit/eb30b4ec16c804ba5990ffb6534a3cd5fa7a8182))
- **LazyContainer:** 重构组件及文档 ([eb30b4e](https://github.com/crlang/vue-tony-admin/commit/eb30b4ec16c804ba5990ffb6534a3cd5fa7a8182))
- **ScrollContainer:** 重构组件及文档([eb30b4e](https://github.com/crlang/vue-tony-admin/commit/eb30b4ec16c804ba5990ffb6534a3cd5fa7a8182))
- **Authority:** 重构组件及文档 ([ea6b6b3](https://github.com/crlang/vue-tony-admin/commit/ea6b6b3bd07e05c82898df8b1f8ac0d4cb099651))
- **BasicForm:** 重构组件及文档 ([fda4e37](https://github.com/crlang/vue-tony-admin/commit/fda4e37d31078d1031bae8175991b12f215712b9))
- **BasicModal:** 重构组件及文档 ([104cb42](https://github.com/crlang/vue-tony-admin/commit/104cb425cb48a5dae4f0dd7782cf854f94034b95))
- **BasicTable:** 重构组件及文档 ([b272c19](https://github.com/crlang/vue-tony-admin/commit/b272c19fded75ef6e6714c7aa9a7af74dc24fa97))
- **BasicUpload:** 重构组件及文档 ([1a023a1](https://github.com/crlang/vue-tony-admin/commit/1a023a10444e7d0cb89f9061bc77d7440c288e8d))
- **CardGrid:** 重构组件及文档 ([17f257f](https://github.com/crlang/vue-tony-admin/commit/17f257f968cd3d75a423fcd9a3fce2d5a6cb5ff7))
- **ContextMenu:** 重构组件及文档 ([b3d4439](https://github.com/crlang/vue-tony-admin/commit/b3d4439ae44400073dd3471c370f040b6eb0a147))
- **CountTo:** 重构组件及文档 ([02bedba](https://github.com/crlang/vue-tony-admin/commit/02bedbae13233cd9a80dfcfc2247f497abb73973))
- **BasicDescription:** 重构组件及文档 ([e56621b](https://github.com/crlang/vue-tony-admin/commit/e56621bcc164097c4c1fcf1d76abfc722087e2cf))
- **BasicDrawer:** 重构组件及文档 ([4a1e364](https://github.com/crlang/vue-tony-admin/commit/4a1e3647ceedfc1037309ebc71baa87d615e80ee))
- **StrengthMeter:** 重构组件及文档 ([653d6f9](https://github.com/crlang/vue-tony-admin/commit/653d6f985a57d3eeb2aeb3e47aded76d837be2d2))
- **Transition:** 重构组件及文档 ([6c64c2c](https://github.com/crlang/vue-tony-admin/commit/6c64c2cc466c8223966b41b2edfcec5f1b1c7f25))
- **VirtualScroll:** 重构组件及文档 ([78615cc](https://github.com/crlang/vue-tony-admin/commit/78615cc4681c911a32caabf4f69abf779af9d235))
- **Time:** 重构组件及文档 ([4abc43c](https://github.com/crlang/vue-tony-admin/commit/4abc43cdf28c3eee1b36dd174149686c9a7e08e4))
- **DragVerify:** 重构组件及文档 ([aa18be4](https://github.com/crlang/vue-tony-admin/commit/aa18be4323423b4c983d96b1a614faa3dd47f850))

### Performance Improvements

- 兼容更好的导入方法 ([9c0065a](https://github.com/crlang/vue-tony-admin/commit/9c0065ac2746ce7146fdb32866ee9f058a8f9b36))

### Bug Fixes

- 重命名和检索示例 ([e2e7a4e](https://github.com/crlang/vue-tony-admin/commit/e2e7a4e0d852caa60c451edb3b47aa8d37aabec1))
- 将 Form 重命名为 BasicForm ([3bb3b19](https://github.com/crlang/vue-tony-admin/commit/3bb3b1904fd6e05f8a9c6e9f9d8c0f31de46bf74))
- 将 Modal 重命名为 BasicModal ([af3d3e2](https://github.com/crlang/vue-tony-admin/commit/af3d3e2f08e428a086265253530b005b8c84c29a)) \*将 Table 重命名为 BasicTable ([990d478](https://github.com/crlang/vue-tony-admin/commit/990d4783aef1869a98480da020e10eec8eb1fbea))
- 将 Upload 重命名为 BasicUpload ([f8bd2ca](https://github.com/crlang/vue-tony-admin/commit/f8bd2caba8dd4a65b006c75f2e015c711158b13b))
- **Basic:** 优化操作栏确认按钮 ([79fdb6f](https://github.com/crlang/vue-tony-admin/commit/79fdb6ff11575894ea1c549c5f52ec420c8065ea))
- **BasicModal:** 修复无法关闭弹窗 ([75214ed](https://github.com/crlang/vue-tony-admin/commit/75214edb4ac1d005b31fb9bf446e20e87e687c7c))
- **BasicModal:** 移除 draggable，官方支持 draggable ([302b2b5](https://github.com/crlang/vue-tony-admin/commit/302b2b5a0f527909902d6b57a10e9305726939f2))
- 更改名称以避免冲突 ([465c172](https://github.com/crlang/vue-tony-admin/commit/465c172de80dc63bd5a3c700950d4dd588f9f921))
- **Cropper:** 移除组件 ([73b7ad8](https://github.com/crlang/vue-tony-admin/commit/73b7ad8641cc9289979a9085049938a7c93364ed))
- 修复动态高度引起的滚动条 ([db80397](https://github.com/crlang/vue-tony-admin/commit/db803977d2d0c8d2d0e9750b960362c36899eda5))
- 修复空 prop 引起的警告 ([5931df2](https://github.com/crlang/vue-tony-admin/commit/5931df25db8f219cbc746ff9d05e60e8a653602c))
- **Form:** 点击提交不返回内容 ([787358a](https://github.com/crlang/vue-tony-admin/commit/787358ab5504ae02ab4db31479ebb8c8a34902d9))
- 无法声明全局组件 ([702b79e](https://github.com/crlang/vue-tony-admin/commit/702b79eb884c702411c1bf95b416547a29a54210))
- 导入名称错误 ([dd067f0](https://github.com/crlang/vue-tony-admin/commit/dd067f0ff6f84f6d8d06c603073b36bf412150ce))
- 优化 Element Plus 的引入 ([85ee565](https://github.com/crlang/vue-tony-admin/commit/85ee5650786ad5165a949753be8c7a7199fa33a0))
- 优化指令 ([9dd3158](https://github.com/crlang/vue-tony-admin/commit/9dd3158c9a5ca1bd9778c8600a30244314d6a31d))
- 部分暗模式匹配 ([b97a52e](https://github.com/crlang/vue-tony-admin/commit/b97a52edfef5960a91f563ec6855225f3c04811e))
- **Progress：** 移除组件，替换官方组件（[affe8db](https://github.com/crlang/vue-tony-admin/commit/affe8db87e142f24c4a132388cf7e4cbe8b77718)）
- 移除 BasicArrow，重新优化 BasicHelp 和 BasicTitle 组件和文档（[aae1e95](https://github.com/crlang/vue-tony-admin/commit/aae1e95ecab1b564f9739ae5a4a2d611be5e2dcf)）
- 删除多余的标签 ([dd80377](https://github.com/crlang/vue-tony-admin/commit/dd803772c94f030f474fd989e8256b7a12b27f4d))
- 移除 imgPreview 组件 ([2e74276](https://github.com/crlang/vue-tony-admin/commit/2e7427606f8160c3438c1f235adda00890b78370))
- 删除一些无意义的兼容代码([284f69f](https://github.com/crlang/vue-tony-admin/commit/284f69fab5296bc3ccbf2bb8653b0e2b5b7f9620))
- 删除 tree 冗余代码 ([b820e2f](https://github.com/crlang/vue-tony-admin/commit/b820e2f8f52de58f0941952b3f7a03cd6f9859a1))
- 删除不必要的空格处理 ([59d5fc7](https://github.com/crlang/vue-tony-admin/commit/59d5fc7d0a7bbe8b7276036fe2c1e0018474872f))
- 剥离表单子项组件和其他细节优化（[6f24310](https://github.com/crlang/vue-tony-admin/commit/6f243106dca509f50843175a59db97a6d73d9dad)）
- 使用消息优化 ([c3a2cbf](https://github.com/crlang/vue-tony-admin/commit/c3a2cbfa31a89b8604e000f071cc2042fbddf82f))

## [0.3.1](https://github.com/crlang/vue-tony-admin/compare/0.3.0...0.3.1) (2022-04-22)

### Bug Fixes

- 移除默认 svg 大小 ([3e4c048](https://github.com/crlang/vue-tony-admin/commit/3e4c048cce6b4f6604a073cbeae69c7446525e95))
- 移除国际化支持 ([6878421](https://github.com/crlang/vue-tony-admin/commit/6878421b5bf3d269bd569895811ad4727daa760a))

# [0.3.0](https://github.com/crlang/vue-tony-admin/compare/0.2.2...0.3.0) (2022-04-20)

### Bug Fixes

- 调整默认页码大小 ([b9035fc](https://github.com/crlang/vue-tony-admin/commit/b9035fce7849c502e048e8dbc783bf4cb4df2e47))
- 调整默认图片样式 ([8aefe27](https://github.com/crlang/vue-tony-admin/commit/8aefe279e0bb04da8ea54ad01ef52ed61e63ce4b))
- 统一调整框架页面类名 ([845daf2](https://github.com/crlang/vue-tony-admin/commit/845daf243f1203e5f6f78933e42ef4a4798e2a2d))
- 统一调整页面类名 ([b65c3cb](https://github.com/crlang/vue-tony-admin/commit/b65c3cba43b9b1d0abdd4484306c54af52e816d5))
- **Drawer:** 修改为默认插入 body ([283fe8a](https://github.com/crlang/vue-tony-admin/commit/283fe8ad3dc1d27e5fa42cab0c4d9a44a6e0f5b7))
- 修复行高继承问题 ([9e964e1](https://github.com/crlang/vue-tony-admin/commit/9e964e13e3d2bdb72712a3e45202831572ca6997))
- 修复侧边展开移位 ([6cd61e5](https://github.com/crlang/vue-tony-admin/commit/6cd61e593e829897c4379559a6c8ef4d41453444))
- 登录菜单 tab 优化 ([6f80143](https://github.com/crlang/vue-tony-admin/commit/6f801434dab0b8bf24503372b0be4fbf9044c973))
- mock 数据调整 ([085792a](https://github.com/crlang/vue-tony-admin/commit/085792ac28e61b92b0c0790f24a5a6a71ea0fe44))
- 修复 dayjs 导入错误 ([3824d47](https://github.com/crlang/vue-tony-admin/commit/3824d47ef8f4564469e197c19e43ec8589e78ebb))
- 修复 page 底部区域无法显示 ([4f08a61](https://github.com/crlang/vue-tony-admin/commit/4f08a61cd589e6b25fd800d3a01d8004697553c1))
- **Qrcode:** 组件优化 ([d60d02f](https://github.com/crlang/vue-tony-admin/commit/d60d02f7102dcd1d340d19dded1fb7665f56b381))
- **QrCode:** 分离组件到 QrCode 分支 ([23de7c5](https://github.com/crlang/vue-tony-admin/commit/23de7c59e3022ae3789d0df53db957a7948f1345))
- 移除 crypto-js 和 cipher ([4c6f9ab](https://github.com/crlang/vue-tony-admin/commit/4c6f9abd3d6b3f7ff0a1dcc21ebbeaaa51944a0b))
- 移除冗余代码 ([b4e60c8](https://github.com/crlang/vue-tony-admin/commit/b4e60c85065ada14a6b45ee31b38f7fc5f52a3c8))
- 移除表的可排序功能 ([6497357](https://github.com/crlang/vue-tony-admin/commit/6497357a29834fc6ca2fd0297aea9604ceddc329))
- 重命名 QrCode ([333a110](https://github.com/crlang/vue-tony-admin/commit/333a110d368525d535fc97447df3141304665b9f))
- 调整非 root svg 的大小 ([b4cc506](https://github.com/crlang/vue-tony-admin/commit/b4cc5068803b18efb3678ce95f4228e3688bc70c))
- 更新表格示例 ([e81577e](https://github.com/crlang/vue-tony-admin/commit/e81577ed9856595129e9d15b69d4fdaa1f276bb1))
- **Table:** 优化 resize 引起的问题 ([fb60cea](https://github.com/crlang/vue-tony-admin/commit/fb60ceaa90ce195304c0347c57b017e1eb971697))
- **Table:** 删除标题设置中的索引和复选框 ([6b35c19](https://github.com/crlang/vue-tony-admin/commit/6b35c1987c9afe15b2cdbb1c6ae835420ac1c4f8))
- **Table:** 修复由 canresize 引起的滚动问题 ([73db237](https://github.com/crlang/vue-tony-admin/commit/73db237f186c7302d79d563742b11d6e5680287a))
- 主题配置优化，修复主题无法更改的问题 ([9890883](https://github.com/crlang/vue-tony-admin/commit/98908837b9b1213325ef76b6999c919ce0706b6c))
- 撤回非 root svg 调整 ([43af59c](https://github.com/crlang/vue-tony-admin/commit/43af59c9d402b5556a42471db2a7caf776517209))
- 更新示例 ([f30b87a](https://github.com/crlang/vue-tony-admin/commit/f30b87a320c9e2863756705fab5b78907a3687de))
- 更新页面描述示例([4a53a20](https://github.com/crlang/vue-tony-admin/commit/4a53a20a0f541384ec05bead53f6ac8983c354d1))
- 更新页面表单示例 ([ffb291d](https://github.com/crlang/vue-tony-admin/commit/ffb291da8c3c59aaff046c64e1628b60f1b8a5df))
- 更新表格示例 ([8963cf4](https://github.com/crlang/vue-tony-admin/commit/8963cf4f5ae834c13c2762e7b7b8b46fcf2035de))

### Features

- 修改 moment 为 dayjs ([647098e](https://github.com/crlang/vue-tony-admin/commit/647098e3ba238baf07a1ebc86e7adc25c3c7a70a))

### Performance Improvements

- 提升开发加载速度 ([0c58da7](https://github.com/crlang/vue-tony-admin/commit/0c58da7ffad0b01002afb0a6d77c2b2e3d5640cc))
- 优化整体加载速度 ([b1d955f](https://github.com/crlang/vue-tony-admin/commit/b1d955f3c144fc23ebd3c8e309f4f1ff432cdd4c))

## [0.2.2](https://github.com/crlang/vue-tony-admin/compare/0.2.1...0.2.2) (2022-04-10)

### Bug Fixes

- 移除按钮默认尺寸，修复表单提交区域尺寸 ([b353a45](https://github.com/crlang/vue-tony-admin/commit/b353a45805b69e4461ab86a0139324654de98d2b))
- 系统管理示例更新 ([eba5359](https://github.com/crlang/vue-tony-admin/commit/eba53592a91c4ed7f97c7b07a4a9a40791ab6c34))

## [0.2.1](https://github.com/crlang/vue-tony-admin/compare/0.1.1-beta.4...0.2.1) (2022-04-05)

### Bug Fixes

- 账号管理调整 ([42935a3](https://github.com/crlang/vue-tony-admin/commit/42935a34d70e26ebbe7d93e80af6029d8fd8c2b2))
- 表格分页调整 ([064a94e](https://github.com/crlang/vue-tony-admin/commit/064a94ee7e6ddfc33168deeb9ccab19df59800b0))
- svg 移除宽度定义 ([c48e844](https://github.com/crlang/vue-tony-admin/commit/c48e8449dc0d0bd1cd43924127411c86a886fd89))
- 更新 charts 示例 ([054a654](https://github.com/crlang/vue-tony-admin/commit/054a6546492d6978bd4eaa0c4523b845c7c594f1))
- **Markdown:** 组件迁移至分支 ([87749af](https://github.com/crlang/vue-tony-admin/commit/87749af7f749ac0729d84abe77fafb649cd693c9))
- **Markdown:** 组件名称调整 ([34d71d7](https://github.com/crlang/vue-tony-admin/commit/34d71d75f532eb19122c09b23f5638ad804cee75))
- **Markdown:** 细节优化 ([2631e3e](https://github.com/crlang/vue-tony-admin/commit/2631e3e6d8617e7ad042c30ff34bcddafe8ae151))
- **Modal:** 默认按钮样式调整 ([98d11bb](https://github.com/crlang/vue-tony-admin/commit/98d11bbeb471498175889a20b0f7844884b1963c))
- 优化资源大小 ([04bba08](https://github.com/crlang/vue-tony-admin/commit/04bba08d0065882c5b1034542eba6cd2e191b434))
- 移除 Excel 组件并迁移到 Excel 分支 ([9dd8be3](https://github.com/crlang/vue-tony-admin/commit/9dd8be3b0c232a8d03b8c7ceef9e7a197a5fc47f))
- **Tinymce:** 添加 menubar 属性 ([3da910b](https://github.com/crlang/vue-tony-admin/commit/3da910b153b826f6bb0afeffb35cf1d373ed673b))
- **Tinymce:** 调整上传错误及默认选值 ([e5005ca](https://github.com/crlang/vue-tony-admin/commit/e5005ca660fd732b037813f20aebdf6a4c6d71db))
- **Tinymce:** 组件迁移至分支 ([aca0333](https://github.com/crlang/vue-tony-admin/commit/aca0333b979288c9e32bdaef0423aa637cf32a4c))
- 更新 Element Plus 到 2.1.7 ([c10e758](https://github.com/crlang/vue-tony-admin/commit/c10e7585bf5803806a9defad8b4cdefcf5f1a9ab))

### Features

- 添加工作区配置".vscode/tony.code-workspace"，更好的一键开发 ([1ffec11](https://github.com/crlang/vue-tony-admin/commit/1ffec1110fb6409e56aa3a8777cb7dc61747fc31))
- **Page:** 添加 toolbar 到头部插槽 ([a50c758](https://github.com/crlang/vue-tony-admin/commit/a50c758213cf44b0d22583a9f4681dc5806b47e8))

### Performance Improvements

- 登录界面优化 ([edb39b2](https://github.com/crlang/vue-tony-admin/commit/edb39b23a6a9bed4cd0d95408db5513de08cfcac))
- 优化构建，提升构建及加载速度 ([e8825f5](https://github.com/crlang/vue-tony-admin/commit/e8825f5422bba5e9d28ac67d0d0ff700c6976156))

## [0.1.1-beta.4](https://github.com/crlang/vue-tony-admin/compare/0.1.1-beta.3...0.1.1-beta.4) (2022-03-25)

### Bug Fixes

- 调整 i18n 内容 ([5e53697](https://github.com/crlang/vue-tony-admin/commit/5e5369723c032319ddd617f49ecd59187467423c))
- 调整启动项以适应 devtool ([7ac5b4b](https://github.com/crlang/vue-tony-admin/commit/7ac5b4b5a97734bf9d65c643a4e7e32af1798576))
- 修复头部项点击区域 ([c459381](https://github.com/crlang/vue-tony-admin/commit/c45938108a4eae31e28653500bc7e64cf8c390f6))
- 修复头部标点位置问题 ([de8da21](https://github.com/crlang/vue-tony-admin/commit/de8da2153faa5546b1886f93717610916ab85e0d))
- 登录功能优化 ([3c4705f](https://github.com/crlang/vue-tony-admin/commit/3c4705f46e408f90ca086118a3971ee5d234704a))
- 移除表格部分冗余数据 ([11d5a52](https://github.com/crlang/vue-tony-admin/commit/11d5a52ff22038a66952b8019db6e6e35cb3c8ca))
- **Table:** 优化调整操作列 ([2e55af2](https://github.com/crlang/vue-tony-admin/commit/2e55af22fd6410ecbdea4259ad713b6370fa35d3))
- **Table:** 修复自定义列的 customRender 函数异常问题 ([d1eaf4a](https://github.com/crlang/vue-tony-admin/commit/d1eaf4a1d1cb7d27e93a9e3569973f2163c8efc7))

### Reverts

- 撤回演示数据 ([f56031f](https://github.com/crlang/vue-tony-admin/commit/f56031ff1b137e132c13cbaaf33c6b1c882914d4))

## [0.1.1-beta.3](https://github.com/crlang/vue-tony-admin/compare/0.1.1-beta.2...0.1.1-beta.3) (2022-03-10)

主要针对表格进行进一步优化完善

### Bug Fixes

- 优化部分组件 prop ([9ec5c73](https://github.com/crlang/vue-tony-admin/commit/9ec5c73c6c9989edf1664825574419f32cc6b1db))
- **Form:** 调整 props ([7aecb5a](https://github.com/crlang/vue-tony-admin/commit/7aecb5a8349c55244bc1e8a1ae38facc05742b41))
- **Table:** 调整自定义事件 ([42cd20c](https://github.com/crlang/vue-tony-admin/commit/42cd20c625a304f030dfe06b33e72737485aa749))
- **Table:** 重新调整自定义功能 ([9250d4f](https://github.com/crlang/vue-tony-admin/commit/9250d4f1737d5438890d934f2e84a373395fcd4f))
- **Table:** 组件优化 ([a50d73e](https://github.com/crlang/vue-tony-admin/commit/a50d73e07e9838da959b87490a68390ecc90a277))

### Features

- **Table:** 支持 element plus 功能 ([61fb8ad](https://github.com/crlang/vue-tony-admin/commit/61fb8ad676f11d40db2ee895cc7dccad323ae5c1))
- **Table:** 支持 element plus 事件 ([98e8c8b](https://github.com/crlang/vue-tony-admin/commit/98e8c8b42e5af2026d547b84d851903f3cfbe85e))

## [0.1.1-beta.2](https://github.com/crlang/vue-tony-admin/compare/0.1.1-beta.1...0.1.1-beta.2) (2022-03-02)

### Bug Fixes

- 调整优化基础组件 ([7606993](https://github.com/crlang/vue-tony-admin/commit/76069932e39ee98ee5c3f95895c1b822a2175af8))
- 调整部分 props 及组件路径 ([52c6559](https://github.com/crlang/vue-tony-admin/commit/52c655901ea6402d32b3687ed643d2ba08b35980))
- **CircleProgress:** 组件二次优化及文档完善 ([48238a8](https://github.com/crlang/vue-tony-admin/commit/48238a8eca932cb0bc9185a2d4ab29c4ddb215ce))
- **Excel:** 组件二次优化及文档完善 ([64e0805](https://github.com/crlang/vue-tony-admin/commit/64e08057b9cc8608021b140bc8bbca3096b4f556))
- **Form:** 组件二次优化及文档完善 ([a5e2c01](https://github.com/crlang/vue-tony-admin/commit/a5e2c010ee6ee976fb086a7d55f1147b20f16fc1))
- **Icon:** 组件二次优化及文档完善 ([485145b](https://github.com/crlang/vue-tony-admin/commit/485145ba80b7bf57e35242f984b06d2880344cc3))
- **List:** 组件二次优化及文档完善 ([cf6ed3f](https://github.com/crlang/vue-tony-admin/commit/cf6ed3f74ef759663249eba6a4d4bc6b1443843c))
- **Markdown:** 组件二次优化及文档完善 ([ce7053f](https://github.com/crlang/vue-tony-admin/commit/ce7053f961cad54625ac6e441db882ef19839bcd))
- **Modal:** 组件二次优化及文档完善 ([eb8eda1](https://github.com/crlang/vue-tony-admin/commit/eb8eda17d031a7ebc4b87fbe5139070ec02deca0))
- **PageWrapper:** 组件二次优化及文档完善 ([f5f6359](https://github.com/crlang/vue-tony-admin/commit/f5f6359877ca950b4330b8e17d7c3c9c98797144))
- **Qrcode:** 组件二次优化及文档完善 ([c38b529](https://github.com/crlang/vue-tony-admin/commit/c38b52952920dc6fd8d8a86acad9e2778d7be8cf))
- **Tinymce:** 组件二次优化及文档完善 ([fa793dd](https://github.com/crlang/vue-tony-admin/commit/fa793dd3b18025784c6de07c36d2d380ececbf2f))
- **Transition:** 组件二次优化及文档完善 ([a6f9b8c](https://github.com/crlang/vue-tony-admin/commit/a6f9b8c5b948b71ea4b3f7b1ab991b08abf45a25))
- 优化 tree 组件的示例 ([9bb1a45](https://github.com/crlang/vue-tony-admin/commit/9bb1a453ddeeeed2b91e0a70a627335dace4ae58))
- **Upload:** 组件二次优化及文档完善 ([231e663](https://github.com/crlang/vue-tony-admin/commit/231e663ad5ce05015b7a55e7e4afc77629815a21))
- **Verify:** 组件二次优化及文档完善 ([d0040ee](https://github.com/crlang/vue-tony-admin/commit/d0040ee6fdc08fa3f717034520b891d5848f93aa))

### Features

- 调整并优化 form/table 的 props ([55761fa](https://github.com/crlang/vue-tony-admin/commit/55761fa0cac3f61f259cf6286bd5d93830248112))
- 添加 progress 示例 ([426eb9a](https://github.com/crlang/vue-tony-admin/commit/426eb9ad82669331a1ad65ffb2b66522d8a42d15))

## [0.1.1-beta.1](https://github.com/crlang/vue-tony-admin/compare/0.0.1-alpha.3...0.1.1-beta.1) (2022-02-13)

### Bug Fixes

- 添加 ElAlert 边框 ([8492f93](https://github.com/crlang/vue-tony-admin/commit/8492f93041d1eb1e214d2e4e789a29c32201a030))
- 调整基础组件 ([b7ee7f6](https://github.com/crlang/vue-tony-admin/commit/b7ee7f62a0dd85aac8f0988a6971f1494d025581))
- 调整后台默认的 element plus 尺寸为 default ([0304bdc](https://github.com/crlang/vue-tony-admin/commit/0304bdc909c4606b249eeecec3c436297502c5f5))
- 调整覆盖 element plus 颜色 ([50883cd](https://github.com/crlang/vue-tony-admin/commit/50883cd5d3b30ed4988342fb195efb0cd07ab752))
- 调整头部搜索 ([9d87ca1](https://github.com/crlang/vue-tony-admin/commit/9d87ca19df457b974cc6c0f289dc39c66abfcced))
- **Button:** 组件优化 ([a0cb821](https://github.com/crlang/vue-tony-admin/commit/a0cb821f51a3d0a13ac11fab324780aa4464ffa3))
- **CardGrid:** 组件优化 ([2f434c7](https://github.com/crlang/vue-tony-admin/commit/2f434c76265b281b2fb22655bfb6bf072ed2a81b))
- **ClickOutSide:** 组件优化 ([fb7e8e6](https://github.com/crlang/vue-tony-admin/commit/fb7e8e67cbd0ef843f5a1369a4abb1db014d25ee))
- **CollapseContainer:** 组件优化 ([6edd70a](https://github.com/crlang/vue-tony-admin/commit/6edd70a710817fb5e9e40a97589830947377a5ae))
- **CountDown:** 组件优化 ([84a9172](https://github.com/crlang/vue-tony-admin/commit/84a91728068f1f9b4a659ba0d5b6e129e853207a))
- **CountTo:** 组件优化 ([5426553](https://github.com/crlang/vue-tony-admin/commit/542655317deed93aacb9b1a3018ff131e7264307))
- **Cropper:** 组件优化 ([0359717](https://github.com/crlang/vue-tony-admin/commit/0359717f609e9534ef88c5dbbf3b98197d559071))
- **Description:** 组件优化 ([f49bd77](https://github.com/crlang/vue-tony-admin/commit/f49bd776bde6340004d01535bb2abc8a86ba3030))
- **Drawer:** 组件优化 ([9804d87](https://github.com/crlang/vue-tony-admin/commit/9804d87d90a7aa2cbdde5ae226ea0ba56892ca73))
- 修复表单组件 bug ([c383963](https://github.com/crlang/vue-tony-admin/commit/c3839632413360e2f93a6079f33875f3206fcf9f))
- 修复因为 v-loading 引起的内存溢出 ([0133fa2](https://github.com/crlang/vue-tony-admin/commit/0133fa28f7ad2868c6cc6a9fba811c0f819f6c93))
- 优化头像组件可能为空时的错误 ([4123c91](https://github.com/crlang/vue-tony-admin/commit/4123c91d1705ea72f2940d8e80ad6e547f1232b1))
- 优化基础组件示例 ([50be741](https://github.com/crlang/vue-tony-admin/commit/50be741600c4f9c8dcab2fbe2c3dcc3c732eafd8))
- 优化类型传递引起的编辑器错误提示 ([ef8b990](https://github.com/crlang/vue-tony-admin/commit/ef8b99029c9389fafcdd9a6be507ed93abdb6f43))
- **LazyContainer:** 组件优化 ([32cf073](https://github.com/crlang/vue-tony-admin/commit/32cf073dfd2fd8502ea81b0d38877fbed3f832c2))
- 调整 logo 标题 ([8dc4f2c](https://github.com/crlang/vue-tony-admin/commit/8dc4f2cb39911cce52833aac20eae6792accd4cd))
- 禁止菜单文字选择 ([f261dab](https://github.com/crlang/vue-tony-admin/commit/f261dab8498e11e7ec8b8ada94bd0018b8513dca))
- 移除 CodeEditor ([f636e01](https://github.com/crlang/vue-tony-admin/commit/f636e01f7f82e8236ee1b0e3f1f5cfed19d5f230))
- 移除图片默认边框 ([ecd52e4](https://github.com/crlang/vue-tony-admin/commit/ecd52e4d0038c500a2296345ccaf5be3bc6d91b4))
- 移除就的 element props ([4470abf](https://github.com/crlang/vue-tony-admin/commit/4470abf6e0e247bfc142b6b5ccdf9b9cf4c3fad4))
- 移除 loading ([4e0971d](https://github.com/crlang/vue-tony-admin/commit/4e0971d8281e4f14d98a542787f4c73a64168dd3))
- 重命名 sass 的 namespace 为 tonyname ([322dd99](https://github.com/crlang/vue-tony-admin/commit/322dd9961cf4a55d107045aa37693d2b5a90fffb))
- **ScrollContainer:** 组件优化 ([2bb98ea](https://github.com/crlang/vue-tony-admin/commit/2bb98ead3d227f1f69582105443c2aeb9e9fefca))
- **StrengthMeter:** 组件优化 ([b1b053a](https://github.com/crlang/vue-tony-admin/commit/b1b053a454984b8d56d1eeb2bf9c4bef810c7463))
- **Time:** 组件优化 ([db52118](https://github.com/crlang/vue-tony-admin/commit/db521187328fda7f129a2e32826b4dbc1a343f40))
- **VirtualScroll:** 组件优化 ([44997e2](https://github.com/crlang/vue-tony-admin/commit/44997e2e896d4f9571d78c15fc4a93adb87482c6))

### Features

- 添加主题类型 ([4f76c6e](https://github.com/crlang/vue-tony-admin/commit/4f76c6eb46f5b042533cea8542e153102fb6d7e8))
- **Button:** 添加阴影 ([86730e9](https://github.com/crlang/vue-tony-admin/commit/86730e95b378792963dc0638b1a3bc25f4f371bc))

### Performance Improvements

- 调整 element-plus 为按需引入 ([4393484](https://github.com/crlang/vue-tony-admin/commit/4393484b26dcf3049ac25b564357e6b354e31628))

## [0.0.1-alpha.3](https://github.com/crlang/vue-tony-admin/compare/0.0.1-alpha.2...0.0.1-alpha.3) (2022-01-19)

### Bug Fixes

- 添加输入框边框 ([6db5465](https://github.com/crlang/vue-tony-admin/commit/6db54659f7efcec12e3caade9bda8218bd00cbfc))
- 调整头部锁屏入口 ([7b29c2f](https://github.com/crlang/vue-tony-admin/commit/7b29c2f45a71ecf51338979c7563426ba4f07c8e))
- 优化头部颜色定义 ([39d9135](https://github.com/crlang/vue-tony-admin/commit/39d9135e23abdc8a52a77ce6bafdadbec2dca375))
- 调整锁屏页面 ([9b4ddc5](https://github.com/crlang/vue-tony-admin/commit/9b4ddc57866dbce93b2a9961ef0a221d20c873d3))
- 优化标签页样式 ([8226d65](https://github.com/crlang/vue-tony-admin/commit/8226d65b71a1cda0085282b5f3f6b67acbde27d5))
- 修复部分组件样式异常 ([ff7457f](https://github.com/crlang/vue-tony-admin/commit/ff7457f4ea247ad4f39fc5ce763d11c6d783e908))
- 修复侧边菜单触发点 ([9adfc99](https://github.com/crlang/vue-tony-admin/commit/9adfc99bb7e04efbd046ac816f688aa0f0b81102))
- 头部、侧边栏调整，文字自适应适配背景颜色 ([046f86d](https://github.com/crlang/vue-tony-admin/commit/046f86df4e84c1091eddf25fb6d304825e0ed196))
- **IconPicker:** 修复弹窗异常问题 ([8537061](https://github.com/crlang/vue-tony-admin/commit/85370611138b1904b11a1390cbbfffbd5f68a160))
- **modal:** 修复异常报错 ([132ecc4](https://github.com/crlang/vue-tony-admin/commit/132ecc44a3b6a028ba421159f210ec92420c0d26))
- **modal:** 修复 bottom 插槽异常 ([06f71e6](https://github.com/crlang/vue-tony-admin/commit/06f71e620763c8d2db18ed3be09a9429ddf0c9e6))
- 优化侧边 Logo ([754ae92](https://github.com/crlang/vue-tony-admin/commit/754ae92d28cf6aa32b5ef86fa3c186e1401969f7))
- 优化 env 文件空格在打包后被移除问题 ([cdc749a](https://github.com/crlang/vue-tony-admin/commit/cdc749a732a062c92ecf4be5d8453e73d72c0a7b))

### Features

- 添加 favicon ([40deecf](https://github.com/crlang/vue-tony-admin/commit/40deecf6b5560a1dd7fe99e1c6690ae4bb7a814b))
- **CardGrid:** 添加部分属性继承 ([056dc89](https://github.com/crlang/vue-tony-admin/commit/056dc89fc1433b36304bde0021cf07070339b147))

### Performance Improvements

- 调整登录界面 ([ea89b69](https://github.com/crlang/vue-tony-admin/commit/ea89b69db32f767e18ee06ed42a2caf11c93055e))

## [0.0.1-alpha.2](https://github.com/crlang/vue-tony-admin/compare/v0.0.1-alpha.1...v0.0.1-alpha.2) (2022-01-13)

### Bug Fixes

- 全局调整 small 为默认尺寸 ([52a8775](https://github.com/crlang/vue-tony-admin/commit/52a87751fe1500a146ef97e646683988f45826fd))
- 修复打包错误 ([c19c3ea](https://github.com/crlang/vue-tony-admin/commit/c19c3eac3aa57e885007e2116300cbd38a042589))
- **button:** 修复颜色异常 ([d53fa7e](https://github.com/crlang/vue-tony-admin/commit/d53fa7efb8289d6b30da81b8abe651b1707e00cd))
- **CardGrid:** 修复异常报错 ([7cdda70](https://github.com/crlang/vue-tony-admin/commit/7cdda703417c34e23a6ec5c404780c4256cfef58))
- **CardGrid:** 优化 CSS 处理 ([19e50a0](https://github.com/crlang/vue-tony-admin/commit/19e50a00aa6e36be12bfa7cbc76e3cf9549a3ebd))

### Performance Improvements

- 调整 Sass 变量为 CSS 自定义属性 ([198f820](https://github.com/crlang/vue-tony-admin/commit/198f820ab617857b8588d6bc24e33c4e0dbcf2d4))

# 0.0.1-alpha.1 (2022-1-4)

### Chores

- **Tony:** 框架基本完善，进入 bug 修复阶段
