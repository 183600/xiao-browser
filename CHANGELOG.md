## [0.7.1](https://github.com/crlang/vue-tony-admin/compare/0.6.1...0.7.1) (2023-05-23)

## Breaking changes

- Upgraded to Vite4, adjusted the packaging method, increased the packaging speed by 2.2 times, and increased the loading speed by 3.1 times
- Migrate from yarn to pnpm for better dependency handling

### Bug Fixes

- Fix upload prompt error ([dca617c](https://github.com/crlang/vue-tony-admin/commit/dca617ce00fe36e65d65e73b71e1cf6a7895d20f))
- Fix bug, useMessage supports closeAll method ([d0cc3b8](https://github.com/crlang/vue-tony-admin/commit/d0cc3b8c9e6e1250d5fd6a5f83e4cb120cad73ec))
- Remove useMessage content field content, keep message as content display ([6c31085](https://github.com/crlang/vue-tony-admin/commit/6c310859b1c1914f41d51b36504a921feb4f6b49))
- **BasicTable:** Add column default sorting configuration ([67289b3](https://github.com/crlang/vue-tony-admin/commit/67289b3165e810ca215f9fdadc71f88fdf127c9a))
- **BasicUpload:** Fix the return value failed to return according to the global configuration ([ae48396](https://github.com/crlang/vue-tony-admin/commit/ae483964bbad14924b2f1787a8d4ca71d3c87382))
- **BasicUpload:** Tips for Optimizing No Data and Uploaded Quantities ([4ea5488](https://github.com/crlang/vue-tony-admin/commit/4ea5488e0d0f9951484403195dda48a8c922635b))

### Features

- **BasicForm:** Support ElTreeSelect component, fix validation rule error ([c31564d](https://github.com/crlang/vue-tony-admin/commit/c31564dd0058cd68d000eed56ce554619dc1d84a))

## [0.6.1](https://github.com/crlang/vue-tony-admin/compare/0.6.0...0.6.1) (2023-04-03)

### Bug Fixes

- Optimization type definition ([3fdeff4](https://github.com/crlang/vue-tony-admin/commit/3fdeff4a26fe9504233ed72cb7f67100eb884e28))
- Optimize logo and help component interface ([62bc8d1](https://github.com/crlang/vue-tony-admin/commit/62bc8d1f1cdd6fc3f6f878bd6c1e6d930504ba43))

### Features

- Upgrade Element Plus version to the latest version 2.3.2 ([3a4c91a](https://github.com/crlang/vue-tony-admin/commit/3a4c91a00fee619b851edbcdb31468e5d3419c68))
- **BasicTable:** Added defaultValue attribute, the default value is displayed when the list item does not exist ([b8ff761](https://github.com/crlang/vue-tony-admin/commit/b8ff76173f0d280dba84a80bbf67c0389968302f))

# [0.6.0](https://github.com/crlang/vue-tony-admin/compare/0.5.7...0.6.0) (2023-03-15)

### Bug Fixes

- **Icon:** Adjust size to support string input ([1e28f50](https://github.com/crlang/vue-tony-admin/commit/1e28f507e314acd162e5e199bb0a373d5e26b51e))
- **SvgIcon:** Adjust size to support string input ([44d95e9](https://github.com/crlang/vue-tony-admin/commit/44d95e92aaf9a9091a56dc42cb0c4d45f099e1ad))

### Features

- Upgrade Element Plus version to the latest version 2.3.0, upgrade Vite version to 3.2.5, and other dependencies to upgrade the latest version ([9ccd2e1](https://github.com/crlang/vue-tony-admin/commit/9ccd2e1610b831be119677eb93fb21b6aabc1126))

## [0.5.7](https://github.com/crlang/vue-tony-admin/compare/0.5.6...0.5.7) (2022-12-01)

### Bug Fixes

- Function optimization, remove some hooks ([2e2ce42](https://github.com/crlang/vue-tony-admin/commit/2e2ce42ad5f917466de9d1f1e1a495db6c3594ee))
- Head component content optimization ([721c268](https://github.com/crlang/vue-tony-admin/commit/721c268d1bb9a15bac6e683c9131e54ee10bc228))
- Fix scroll bar fluctuation caused by page animation ([79c07e8](https://github.com/crlang/vue-tony-admin/commit/79c07e806d804a14372d78b0d74c4e3a59164eb0))
- Fix page transition animation failure ([c029661](https://github.com/crlang/vue-tony-admin/commit/c029661bd85fa0ca80cc1e90dda6ad6c0bec5516))
- remove effect proptype ([bb7afed](https://github.com/crlang/vue-tony-admin/commit/bb7afed127a6a906041ac89ff553af772e634217))
- Optimize icon unified vision, adjust system icon to svg, adjust iconify icon example to ep icon library ([9f112e4](https://github.com/crlang/vue-tony-admin/commit/9f112e4b6996e7712a6dfb25a63a32955a4e30e3))
- The theme color change rule update, support CSS or JS dynamic update ([362e8e9](https://github.com/crlang/vue-tony-admin/commit/362e8e91a59efd2dd7b544f77db40d698c87f77a))
- **BasicTable:** Adjust the setting's fullScreen field to fullscreen ([9246a6d](https://github.com/crlang/vue-tony-admin/commit/9246a6d0e89b8714a5e9f295c383604913ee5a03))
- demo update ([52ba203](https://github.com/crlang/vue-tony-admin/commit/52ba20377c71f95d2e4e47537c34dda55a189a6e))
- **IconPicker:** Optimize the display effect ([c51f4ed](https://github.com/crlang/vue-tony-admin/commit/c51f4edacdd2f00dac906bab647f2e4e440318f4))
- **SvgIcon:** Adjust size and rotate to be limited to numerical values ([d92d655](https://github.com/crlang/vue-tony-admin/commit/d92d655d3fcd04460f22f05192b4d29ce76f7f31))

### Features

- **Icon:** Support importing local svg icons ([7fcaefa](https://github.com/crlang/vue-tony-admin/commit/7fcaefad50f1df2389ed2eea10b3baa194a0ed11))

## [0.5.6](https://github.com/crlang/vue-tony-admin/compare/0.5.5...0.5.6) (2022-10-21)

### Bug Fixes

- Repair the menu, the drag bar disappears after dragging, and the top menu cannot be dynamically aligned ([8fb569f](https://github.com/crlang/vue-tony-admin/commit/8fb569ff070cf8630c79b2e649353433e86945b9))
- Repair lock screen input blank ([4217c2d](https://github.com/crlang/vue-tony-admin/commit/4217c2db1b44c7cbfe38b8efedfda85f3336a079))
- Fix undefined errors ([e8fb534](https://github.com/crlang/vue-tony-admin/commit/e8fb53421e5505c4828a3af37cbd7ab0f73fe934))
- Remove is judgment ([4fb1f24](https://github.com/crlang/vue-tony-admin/commit/4fb1f246d50305b0dab386aa6a3ad3a09b16f57c))
- Optimize more friendly project configuration area ([87219cc](https://github.com/crlang/vue-tony-admin/commit/87219cc9ef11e484457879cac11c3b3003e85ab9))
- Changing the isObject to @ vueuse/core calls can achieve better judgment results ([cb9a325](https://github.com/crlang/vue-tony-admin/commit/cb9a325af6638c44c5899cc19d74b024ac71e26c))

### Features

- add configurable dynamic head button ([01498d7](https://github.com/crlang/vue-tony-admin/commit/01498d7b7661fc9b0bca67f14ebf925cbb4712ed))
- add item configuration button switch ([95f43e6](https://github.com/crlang/vue-tony-admin/commit/95f43e6df6b1fa24ab43651fb2c080cfe7719b76))

## [0.5.5](https://github.com/crlang/vue-tony-admin/compare/0.5.4...0.5.5) (2022-08-21)

### Bug Fixes

- Adjust how colors and dark mode are handled ([d41fafe](https://github.com/crlang/vue-tony-admin/commit/d41fafe11bc9e28e0622a1e2b405cfda9b591a99))
- fix compatibility issues ([258f1ae](https://github.com/crlang/vue-tony-admin/commit/258f1aecfb1e1b93e49952373698df08feffdf46))
- Fix tabs jumping problem ([40122af](https://github.com/crlang/vue-tony-admin/commit/40122af79bf91a0776518d607373785ca0102778))
- Remove unnecessary fields from menu ([4444383](https://github.com/crlang/vue-tony-admin/commit/444438386ae4eb2e74db1ac98cb14f8b74953a1b))
- Rename component to avoid same name as HTML element ([8656842](https://github.com/crlang/vue-tony-admin/commit/86568421dca6e7e6c850a71c1a2b81dcb1125bce))
- **BasicTable:** Fixed some attribute inactivation issues ([0749968](https://github.com/crlang/vue-tony-admin/commit/0749968bb507b9a5507aa97617d44e32929ef9b4))

### Features

- Switch the project to default Chinese language output ([13faa98](https://github.com/crlang/vue-tony-admin/commit/13faa98e5daf7414c4f302e1769f7c4718bb08ec))
- Added header menu module ([bc3e3be](https://github.com/crlang/vue-tony-admin/commit/bc3e3bea7f97540e130bfc4066e061092acfc4f6))
- Added refactored dark mode ([87307b6](https://github.com/crlang/vue-tony-admin/commit/87307b6b43fd9b7bdff8ff245a1131c20b4cb563))
- **BasicButton:** Rename Button to BasicButton ([c0640ad](https://github.com/crlang/vue-tony-admin/commit/c0640adeec1b050dc4c86566fc836e6d567f771a))
- **RelativeTime:** Rename Time to RelativeTime ([221a1eb](https://github.com/crlang/vue-tony-admin/commit/221a1ebe9879cb47b5a59934ee5873ba6bc81d5d))

## [0.5.4](https://github.com/crlang/vue-tony-admin/compare/0.5.3...0.5.4) (2022-07-21)

### Bug Fixes

- Fix icon dependency package name change ([beeb355](https://github.com/crlang/vue-tony-admin/commit/beeb355cca86c7a9beb6b273e90a4dbb97e1a336))
- Fix the color problem of log ([c013748](https://github.com/crlang/vue-tony-admin/commit/c013748a968bdede80738691eb97c60eae0398b4))
- Remove the content that vue has defined globally ([767d4b2](https://github.com/crlang/vue-tony-admin/commit/767d4b28320818bb454b6eac36b5647ddbfc8ca3))
- **BasicDescription:** Remove editor coloring caused by style ([9804128](https://github.com/crlang/vue-tony-admin/commit/9804128f888d41dd7dde6ae27b304b02289db239))
- **BasicForm:** Fixed inability to control the action button group ([d6180dd](https://github.com/crlang/vue-tony-admin/commit/d6180dddc68bbaa7a23b6274064bb8440fb74008))

### Features

- **BasicTable:** Added whether to show the box shadow property ([5bdb817](https://github.com/crlang/vue-tony-admin/commit/5bdb8174f13e067ad1a7a9acaf4b59d764ac9229))
- **BasicUpload:** Added upload configuration to fix the security warning caused by the upload file field ([f2111af](https://github.com/crlang/vue-tony-admin/commit/f2111afb9b782291b1fcdee7ca357bd71b58aace))
- **PageWrapper:** Added whether to inherit the routing title, optimize the page title display, and inherit the routing title by default ([811fe55](https://github.com/crlang/vue-tony-admin/commit/811fe557118a6d21f5f36b8a547b5899a37b98cc))

## [0.5.3](https://github.com/crlang/vue-tony-admin/compare/0.5.2...0.5.3) (2022-07-11)

### Bug Fixes

- fix undefined issue ([71e3f29](https://github.com/crlang/vue-tony-admin/commit/71e3f29ea8126800d811fe9cebee063b5dacaba4))

### Features

- **useMessage:** Added message option, which has the same effect as content ([bf698d2](https://github.com/crlang/vue-tony-admin/commit/bf698d25f033490a6dd09ee19e2c1c63a4b5f4a3))

## [0.5.2](https://github.com/crlang/vue-tony-admin/compare/0.5.1...0.5.2) (2022-07-08)

### Bug Fixes

- Fixed interface issues caused by Element Plus version upgrades ([7dc6abc](https://github.com/crlang/vue-tony-admin/commit/7dc6abcbecebc0ad09dfa21417811169c3fe0120))
- **BasicModal:** Hide the x-axis scrollbar ([3aa83eb](https://github.com/crlang/vue-tony-admin/commit/3aa83eb88a1e316cda35ba8ccd86bbd6dc95ba87))
- **BasicTable:** Adjust the default width of the action column to 150, fix the icon cannot be displayed ([9497c0c](https://github.com/crlang/vue-tony-admin/commit/9497c0c5ac0e0fb66082d958f4083ef0bcda4002))
- **BasicTable:** Optimize undefined code ([7e1865e](https://github.com/crlang/vue-tony-admin/commit/7e1865ee469400c870a4539862f783730c694b2a))

### Features

- Upgrade Element Plus version to latest version 2.2.9 ([30fd87c](https://github.com/crlang/vue-tony-admin/commit/30fd87cf84aae2fda89ef107f3119dab54ebf30d))
- **BasicForm:** Add automatic judgment whether to display the expand button ([f12ad88](https://github.com/crlang/vue-tony-admin/commit/f12ad882e484a8049314392d94ce4c954b1db872))

### Reverts

- Optimize login exceptions and withdraw some adjustments ([ccc0e07](https://github.com/crlang/vue-tony-admin/commit/ccc0e075ad2f7a719b6fe9c2b1452caada1a5640))

## [0.5.1](https://github.com/crlang/vue-tony-admin/compare/0.5.0...0.5.1) (2022-07-04)

### Performance Improvements

- remove some unnecessary processing files ([0878b99](https://github.com/crlang/vue-tony-admin/commit/0878b995cb82622925038ff40c91d35a1e11642d))

# [0.5.0](https://github.com/crlang/vue-tony-admin/compare/0.3.1...0.5.0) (2022-07-01)

### Features

- add PageWrapper as a global component, abolish the Button global component ([6bbeb43](https://github.com/crlang/vue-tony-admin/commit/6bbeb4383e0da680056891ebffa989748cb804f8))
- **ApiSelect:** add components and documentation ([3c4d0f6](https://github.com/crlang/vue-tony-admin/commit/3c4d0f6c23cd5683532cb91d2ab8fb8adc0c345c))
- **CountdownInput:** add components and documentation ([6cb9ca4](https://github.com/crlang/vue-tony-admin/commit/6cb9ca4d5613693dff4a2c234f6e3b87729082b3))

### Refactors

- **PageWrapper:** reoptimize components and documentation ([6bbeb43](https://github.com/crlang/vue-tony-admin/commit/6bbeb4383e0da680056891ebffa989748cb804f8))
- **Icon:** reoptimize components and documentation ([06f1027](https://github.com/crlang/vue-tony-admin/commit/06f102794dbd9539bd2c5c4eb229e93b9229345a))
- **SvgIcon:** reoptimize components and documentation ([06f1027](https://github.com/crlang/vue-tony-admin/commit/06f102794dbd9539bd2c5c4eb229e93b9229345a))
- **ClickOutside:** reoptimize components and documentation ([5008d97](https://github.com/crlang/vue-tony-admin/commit/5008d976b5b4931f7eb985e3e57150a278fa3aaf))
- **useDesign:** reoptimize function and documentation ([0cba00b](https://github.com/crlang/vue-tony-admin/commit/0cba00bbd242f192b96bcb29fbe02fac051f993f))
- **IconPicker:** reoptimize function and documentation ([a6c6e8d](https://github.com/crlang/vue-tony-admin/commit/a6c6e8de6f5b2b9a0d728b991ffb3ffe455632a8))
- **CollapseContainer:** reoptimize components and documentation([eb30b4e](https://github.com/crlang/vue-tony-admin/commit/eb30b4ec16c804ba5990ffb6534a3cd5fa7a8182))
- **LazyContainer:** reoptimize components and documentation ([eb30b4e](https://github.com/crlang/vue-tony-admin/commit/eb30b4ec16c804ba5990ffb6534a3cd5fa7a8182))
- **ScrollContainer:** reoptimize components and documentation([eb30b4e](https://github.com/crlang/vue-tony-admin/commit/eb30b4ec16c804ba5990ffb6534a3cd5fa7a8182))
- **Authority:** reoptimize components and documentation ([ea6b6b3](https://github.com/crlang/vue-tony-admin/commit/ea6b6b3bd07e05c82898df8b1f8ac0d4cb099651))
- **BasicForm:** reoptimize components and documentation ([fda4e37](https://github.com/crlang/vue-tony-admin/commit/fda4e37d31078d1031bae8175991b12f215712b9))
- **BasicModal:** reoptimize components and documentation ([104cb42](https://github.com/crlang/vue-tony-admin/commit/104cb425cb48a5dae4f0dd7782cf854f94034b95))
- **BasicTable:** reoptimize components and documentation ([b272c19](https://github.com/crlang/vue-tony-admin/commit/b272c19fded75ef6e6714c7aa9a7af74dc24fa97))
- **BasicUpload:** reoptimize components and documentation ([1a023a1](https://github.com/crlang/vue-tony-admin/commit/1a023a10444e7d0cb89f9061bc77d7440c288e8d))
- **CardGrid:** reoptimize components and documentation ([17f257f](https://github.com/crlang/vue-tony-admin/commit/17f257f968cd3d75a423fcd9a3fce2d5a6cb5ff7))
- **ContextMenu:** reoptimize components and documentation ([b3d4439](https://github.com/crlang/vue-tony-admin/commit/b3d4439ae44400073dd3471c370f040b6eb0a147))
- **CountTo:** reoptimize components and documentation ([02bedba](https://github.com/crlang/vue-tony-admin/commit/02bedbae13233cd9a80dfcfc2247f497abb73973))
- **BasicDescription:** reoptimize components and documentation ([e56621b](https://github.com/crlang/vue-tony-admin/commit/e56621bcc164097c4c1fcf1d76abfc722087e2cf))
- **BasicDrawer:** reoptimize components and documentation ([4a1e364](https://github.com/crlang/vue-tony-admin/commit/4a1e3647ceedfc1037309ebc71baa87d615e80ee))
- **StrengthMeter:** reoptimize components and documentation ([653d6f9](https://github.com/crlang/vue-tony-admin/commit/653d6f985a57d3eeb2aeb3e47aded76d837be2d2))
- **Transition:** reoptimize components and documentation ([6c64c2c](https://github.com/crlang/vue-tony-admin/commit/6c64c2cc466c8223966b41b2edfcec5f1b1c7f25))
- **VirtualScroll:** reoptimize components and documentation ([78615cc](https://github.com/crlang/vue-tony-admin/commit/78615cc4681c911a32caabf4f69abf779af9d235))
- **Time:** reoptimize components and documentation ([4abc43c](https://github.com/crlang/vue-tony-admin/commit/4abc43cdf28c3eee1b36dd174149686c9a7e08e4))
- **DragVerify:** reoptimize components and documentation ([aa18be4](https://github.com/crlang/vue-tony-admin/commit/aa18be4323423b4c983d96b1a614faa3dd47f850))

### Performance Improvements

- compatible with better import methods ([9c0065a](https://github.com/crlang/vue-tony-admin/commit/9c0065ac2746ce7146fdb32866ee9f058a8f9b36))

### Bug Fixes

- rename and retrieve example ([e2e7a4e](https://github.com/crlang/vue-tony-admin/commit/e2e7a4e0d852caa60c451edb3b47aa8d37aabec1))
- rename Form to BasicForm ([3bb3b19](https://github.com/crlang/vue-tony-admin/commit/3bb3b1904fd6e05f8a9c6e9f9d8c0f31de46bf74))
- rename Modal to BasicModal ([af3d3e2](https://github.com/crlang/vue-tony-admin/commit/af3d3e2f08e428a086265253530b005b8c84c29a))
- rename Table to BasicTable ([990d478](https://github.com/crlang/vue-tony-admin/commit/990d4783aef1869a98480da020e10eec8eb1fbea))
- rename Upload to BasicUpload ([f8bd2ca](https://github.com/crlang/vue-tony-admin/commit/f8bd2caba8dd4a65b006c75f2e015c711158b13b))
- **Basic:** optimize the confirmation button of the operation column ([79fdb6f](https://github.com/crlang/vue-tony-admin/commit/79fdb6ff11575894ea1c549c5f52ec420c8065ea))
- **BasicModal:** fix can't close popup ([75214ed](https://github.com/crlang/vue-tony-admin/commit/75214edb4ac1d005b31fb9bf446e20e87e687c7c))
- **BasicModal:** remove draggable, officially supports draggable ([302b2b5](https://github.com/crlang/vue-tony-admin/commit/302b2b5a0f527909902d6b57a10e9305726939f2))
- change the name to avoid conflicts ([465c172](https://github.com/crlang/vue-tony-admin/commit/465c172de80dc63bd5a3c700950d4dd588f9f921))
- **Cropper:** remove components ([73b7ad8](https://github.com/crlang/vue-tony-admin/commit/73b7ad8641cc9289979a9085049938a7c93364ed))
- fix scrollbar caused by dynamic height ([db80397](https://github.com/crlang/vue-tony-admin/commit/db803977d2d0c8d2d0e9750b960362c36899eda5))
- fix warnings caused by empty props ([5931df2](https://github.com/crlang/vue-tony-admin/commit/5931df25db8f219cbc746ff9d05e60e8a653602c))
- **Form:** clicking submit does not return content ([787358a](https://github.com/crlang/vue-tony-admin/commit/787358ab5504ae02ab4db31479ebb8c8a34902d9))
- global components cannot be declared ([702b79e](https://github.com/crlang/vue-tony-admin/commit/702b79eb884c702411c1bf95b416547a29a54210))
- import name is wrong ([dd067f0](https://github.com/crlang/vue-tony-admin/commit/dd067f0ff6f84f6d8d06c603073b36bf412150ce))
- optimization content ([f924aae](https://github.com/crlang/vue-tony-admin/commit/f924aaed084866aada552756b6ebfcaa34b00d27))
- optimize the introduction of Element Plus ([85ee565](https://github.com/crlang/vue-tony-admin/commit/85ee5650786ad5165a949753be8c7a7199fa33a0))
- optimized directives ([9dd3158](https://github.com/crlang/vue-tony-admin/commit/9dd3158c9a5ca1bd9778c8600a30244314d6a31d))
- partial dark mode matching ([b97a52e](https://github.com/crlang/vue-tony-admin/commit/b97a52edfef5960a91f563ec6855225f3c04811e))
- **Progress:** remove components, replace official components ([affe8db](https://github.com/crlang/vue-tony-admin/commit/affe8db87e142f24c4a132388cf7e4cbe8b77718))
- remove BasicArrow, reoptimize BasicHelp and BasicTitle components and documentation ([aae1e95](https://github.com/crlang/vue-tony-admin/commit/aae1e95ecab1b564f9739ae5a4a2d611be5e2dcf))
- remove extra tabs ([dd80377](https://github.com/crlang/vue-tony-admin/commit/dd803772c94f030f474fd989e8256b7a12b27f4d))
- remove imgPreview component ([2e74276](https://github.com/crlang/vue-tony-admin/commit/2e7427606f8160c3438c1f235adda00890b78370))
- remove some meaningless compatible code ([284f69f](https://github.com/crlang/vue-tony-admin/commit/284f69fab5296bc3ccbf2bb8653b0e2b5b7f9620))
- remove tree redundant code ([b820e2f](https://github.com/crlang/vue-tony-admin/commit/b820e2f8f52de58f0941952b3f7a03cd6f9859a1))
- remove unnecessary whitespace handling ([59d5fc7](https://github.com/crlang/vue-tony-admin/commit/59d5fc7d0a7bbe8b7276036fe2c1e0018474872f))
- stripping form components and other detail optimizations ([6f24310](https://github.com/crlang/vue-tony-admin/commit/6f243106dca509f50843175a59db97a6d73d9dad))
- useMessage optimization ([c3a2cbf](https://github.com/crlang/vue-tony-admin/commit/c3a2cbfa31a89b8604e000f071cc2042fbddf82f))

## [0.3.1](https://github.com/crlang/vue-tony-admin/compare/0.3.0...0.3.1) (2022-04-22)

### Bug Fixes

- remove svg default size ([3e4c048](https://github.com/crlang/vue-tony-admin/commit/3e4c048cce6b4f6604a073cbeae69c7446525e95))
- remove i18n support ([6878421](https://github.com/crlang/vue-tony-admin/commit/6878421b5bf3d269bd569895811ad4727daa760a))

# [0.3.0](https://github.com/crlang/vue-tony-admin/compare/0.2.2...0.3.0) (2022-04-20)

### Bug Fixes

- adjust default pageSize ([b9035fc](https://github.com/crlang/vue-tony-admin/commit/b9035fce7849c502e048e8dbc783bf4cb4df2e47))
- adjust the default image style ([8aefe27](https://github.com/crlang/vue-tony-admin/commit/8aefe279e0bb04da8ea54ad01ef52ed61e63ce4b))
- adjust the layouts class name ([845daf2](https://github.com/crlang/vue-tony-admin/commit/845daf243f1203e5f6f78933e42ef4a4798e2a2d))
- adjust the page class name ([b65c3cb](https://github.com/crlang/vue-tony-admin/commit/b65c3cba43b9b1d0abdd4484306c54af52e816d5))
- **Drawer:** adjust to insert body by default ([283fe8a](https://github.com/crlang/vue-tony-admin/commit/283fe8ad3dc1d27e5fa42cab0c4d9a44a6e0f5b7))
- fix bug with lineheight inheritance ([9e964e1](https://github.com/crlang/vue-tony-admin/commit/9e964e13e3d2bdb72712a3e45202831572ca6997))
- fix the shift when the side is unfolded ([6cd61e5](https://github.com/crlang/vue-tony-admin/commit/6cd61e593e829897c4379559a6c8ef4d41453444))
- login menu tab width ([6f80143](https://github.com/crlang/vue-tony-admin/commit/6f801434dab0b8bf24503372b0be4fbf9044c973))
- mock data adjustment ([085792a](https://github.com/crlang/vue-tony-admin/commit/085792ac28e61b92b0c0790f24a5a6a71ea0fe44))
- optimize dayjs import error ([3824d47](https://github.com/crlang/vue-tony-admin/commit/3824d47ef8f4564469e197c19e43ec8589e78ebb))
- page footer cannot be displayed ([4f08a61](https://github.com/crlang/vue-tony-admin/commit/4f08a61cd589e6b25fd800d3a01d8004697553c1))
- **Qrcode:** component optimization ([d60d02f](https://github.com/crlang/vue-tony-admin/commit/d60d02f7102dcd1d340d19dded1fb7665f56b381))
- **QrCode:** split extension components to QrCode branch ([23de7c5](https://github.com/crlang/vue-tony-admin/commit/23de7c59e3022ae3789d0df53db957a7948f1345))
- remove crypto-js and cipher ([4c6f9ab](https://github.com/crlang/vue-tony-admin/commit/4c6f9abd3d6b3f7ff0a1dcc21ebbeaaa51944a0b))
- remove redundant code ([b4e60c8](https://github.com/crlang/vue-tony-admin/commit/b4e60c85065ada14a6b45ee31b38f7fc5f52a3c8))
- remove the sortable function of table ([6497357](https://github.com/crlang/vue-tony-admin/commit/6497357a29834fc6ca2fd0297aea9604ceddc329))
- rename QrCode ([333a110](https://github.com/crlang/vue-tony-admin/commit/333a110d368525d535fc97447df3141304665b9f))
- resize non-root svg ([b4cc506](https://github.com/crlang/vue-tony-admin/commit/b4cc5068803b18efb3678ce95f4228e3688bc70c))
- table example update ([e81577e](https://github.com/crlang/vue-tony-admin/commit/e81577ed9856595129e9d15b69d4fdaa1f276bb1))
- **Table:** problems caused by optimizing resize ([fb60cea](https://github.com/crlang/vue-tony-admin/commit/fb60ceaa90ce195304c0347c57b017e1eb971697))
- **Table:** remove index and checkbox in header settings ([6b35c19](https://github.com/crlang/vue-tony-admin/commit/6b35c1987c9afe15b2cdbb1c6ae835420ac1c4f8))
- **Table:** scrolling issue caused by canresize ([73db237](https://github.com/crlang/vue-tony-admin/commit/73db237f186c7302d79d563742b11d6e5680287a))
- theme configuration optimization, fix the problem that the theme cannot be changed ([9890883](https://github.com/crlang/vue-tony-admin/commit/98908837b9b1213325ef76b6999c919ce0706b6c))
- undo non-root svg ([43af59c](https://github.com/crlang/vue-tony-admin/commit/43af59c9d402b5556a42471db2a7caf776517209))
- update example ([f30b87a](https://github.com/crlang/vue-tony-admin/commit/f30b87a320c9e2863756705fab5b78907a3687de))
- update page desc example ([4a53a20](https://github.com/crlang/vue-tony-admin/commit/4a53a20a0f541384ec05bead53f6ac8983c354d1))
- update page form example ([ffb291d](https://github.com/crlang/vue-tony-admin/commit/ffb291da8c3c59aaff046c64e1628b60f1b8a5df))
- update table example ([8963cf4](https://github.com/crlang/vue-tony-admin/commit/8963cf4f5ae834c13c2762e7b7b8b46fcf2035de))

### Features

- change moment to dayjs ([647098e](https://github.com/crlang/vue-tony-admin/commit/647098e3ba238baf07a1ebc86e7adc25c3c7a70a))

### Performance Improvements

- optimize development loading speed ([0c58da7](https://github.com/crlang/vue-tony-admin/commit/0c58da7ffad0b01002afb0a6d77c2b2e3d5640cc))
- optimize loading speed ([b1d955f](https://github.com/crlang/vue-tony-admin/commit/b1d955f3c144fc23ebd3c8e309f4f1ff432cdd4c))

### Reverts

- remove the problem of updating dependencies ([73f86a1](https://github.com/crlang/vue-tony-admin/commit/73f86a134a2107f2080a40482b83892b811e62c1))

## [0.2.2](https://github.com/crlang/vue-tony-admin/compare/0.2.1...0.2.2) (2022-04-10)

### Bug Fixes

- remove default button size, fix form submit area width ([b353a45](https://github.com/crlang/vue-tony-admin/commit/b353a45805b69e4461ab86a0139324654de98d2b))
- system management example optimization ([eba5359](https://github.com/crlang/vue-tony-admin/commit/eba53592a91c4ed7f97c7b07a4a9a40791ab6c34))

## [0.2.1](https://github.com/crlang/vue-tony-admin/compare/0.1.1-beta.4...0.2.1) (2022-04-05)

### Bug Fixes

- account management demo adjustment ([42935a3](https://github.com/crlang/vue-tony-admin/commit/42935a34d70e26ebbe7d93e80af6029d8fd8c2b2))
- add table paging background ([064a94e](https://github.com/crlang/vue-tony-admin/commit/064a94ee7e6ddfc33168deeb9ccab19df59800b0))
- adjust svg size ([c48e844](https://github.com/crlang/vue-tony-admin/commit/c48e8449dc0d0bd1cd43924127411c86a886fd89))
- charts demo update ([054a654](https://github.com/crlang/vue-tony-admin/commit/054a6546492d6978bd4eaa0c4523b845c7c594f1))
- **Markdown:** adjust component name ([34d71d7](https://github.com/crlang/vue-tony-admin/commit/34d71d75f532eb19122c09b23f5638ad804cee75))
- **Markdown:** component has been migrated to the Markdown branch ([87749af](https://github.com/crlang/vue-tony-admin/commit/87749af7f749ac0729d84abe77fafb649cd693c9))
- **Markdown:** final optimization ([2631e3e](https://github.com/crlang/vue-tony-admin/commit/2631e3e6d8617e7ad042c30ff34bcddafe8ae151))
- **Modal:** optimize button default style ([98d11bb](https://github.com/crlang/vue-tony-admin/commit/98d11bbeb471498175889a20b0f7844884b1963c))
- optimize resource size ([04bba08](https://github.com/crlang/vue-tony-admin/commit/04bba08d0065882c5b1034542eba6cd2e191b434))
- remove Excel components and migrate to Excel branch ([9dd8be3](https://github.com/crlang/vue-tony-admin/commit/9dd8be3b0c232a8d03b8c7ceef9e7a197a5fc47f))
- **Tinymce:** add menubar prop ([3da910b](https://github.com/crlang/vue-tony-admin/commit/3da910b153b826f6bb0afeffb35cf1d373ed673b))
- **Tinymce:** adjust the invocation of the plugin to fix upload errors ([e5005ca](https://github.com/crlang/vue-tony-admin/commit/e5005ca660fd732b037813f20aebdf6a4c6d71db))
- **Tinymce:** split extension components to Tinymce branch ([aca0333](https://github.com/crlang/vue-tony-admin/commit/aca0333b979288c9e32bdaef0423aa637cf32a4c))
- upgrade Element Plus version to 2.1.7 ([c10e758](https://github.com/crlang/vue-tony-admin/commit/c10e7585bf5803806a9defad8b4cdefcf5f1a9ab))

### Features

- add new vscode workspace ".vscode/tony.code-workspace" for better development experience ([1ffec11](https://github.com/crlang/vue-tony-admin/commit/1ffec1110fb6409e56aa3a8777cb7dc61747fc31))
- **Page:** add toolbar header slot ([a50c758](https://github.com/crlang/vue-tony-admin/commit/a50c758213cf44b0d22583a9f4681dc5806b47e8))

### Performance Improvements

- login form optimization ([edb39b2](https://github.com/crlang/vue-tony-admin/commit/edb39b23a6a9bed4cd0d95408db5513de08cfcac))
- optimize build exception errors, subcontract content, and improve loading speed ([e8825f5](https://github.com/crlang/vue-tony-admin/commit/e8825f5422bba5e9d28ac67d0d0ff700c6976156))

## [0.1.1-beta.4](https://github.com/crlang/vue-tony-admin/compare/0.1.1-beta.3...0.1.1-beta.4) (2022-03-25)

### Bug Fixes

- adjust i18n related content ([5e53697](https://github.com/crlang/vue-tony-admin/commit/5e5369723c032319ddd617f49ecd59187467423c))
- adjust startup items to fit vue devtool ([7ac5b4b](https://github.com/crlang/vue-tony-admin/commit/7ac5b4b5a97734bf9d65c643a4e7e32af1798576))
- fix head click exception ([c459381](https://github.com/crlang/vue-tony-admin/commit/c45938108a4eae31e28653500bc7e64cf8c390f6))
- fix header badge position ([de8da21](https://github.com/crlang/vue-tony-admin/commit/de8da2153faa5546b1886f93717610916ab85e0d))
- login function adjustment ([3c4705f](https://github.com/crlang/vue-tony-admin/commit/3c4705f46e408f90ca086118a3971ee5d234704a))
- remove redundant attributes ([11d5a52](https://github.com/crlang/vue-tony-admin/commit/11d5a52ff22038a66952b8019db6e6e35cb3c8ca))
- **Table:** fix action column ([2e55af2](https://github.com/crlang/vue-tony-admin/commit/2e55af22fd6410ecbdea4259ad713b6370fa35d3))
- **Table:** fix the infinite loop caused by customRender ([d1eaf4a](https://github.com/crlang/vue-tony-admin/commit/d1eaf4a1d1cb7d27e93a9e3569973f2163c8efc7))

### Reverts

- withdraw demo data ([f56031f](https://github.com/crlang/vue-tony-admin/commit/f56031ff1b137e132c13cbaaf33c6b1c882914d4))

## [0.1.1-beta.3](https://github.com/crlang/vue-tony-admin/compare/0.1.1-beta.2...0.1.1-beta.3) (2022-03-10)

### Bug Fixes

- fix table index prop error problem ([9ec5c73](https://github.com/crlang/vue-tony-admin/commit/9ec5c73c6c9989edf1664825574419f32cc6b1db))
- **Form:** adjust component props ([7aecb5a](https://github.com/crlang/vue-tony-admin/commit/7aecb5a8349c55244bc1e8a1ae38facc05742b41))
- **Table:** adjust custom event ([42cd20c](https://github.com/crlang/vue-tony-admin/commit/42cd20c625a304f030dfe06b33e72737485aa749))
- **Table:** component optimization ([a50d73e](https://github.com/crlang/vue-tony-admin/commit/a50d73e07e9838da959b87490a68390ecc90a277))
- **Table:** readjust and optimize table related functions ([9250d4f](https://github.com/crlang/vue-tony-admin/commit/9250d4f1737d5438890d934f2e84a373395fcd4f))
- **Table:** support element plus method ([61fb8ad](https://github.com/crlang/vue-tony-admin/commit/61fb8ad676f11d40db2ee895cc7dccad323ae5c1))

### Features

- **Table:** support element plus event ([98e8c8b](https://github.com/crlang/vue-tony-admin/commit/98e8c8b42e5af2026d547b84d851903f3cfbe85e))

## [0.1.1-beta.2](https://github.com/crlang/vue-tony-admin/compare/0.1.1-beta.1...0.1.1-beta.2) (2022-03-02)

### Bug Fixes

- adjust basic props ([7606993](https://github.com/crlang/vue-tony-admin/commit/76069932e39ee98ee5c3f95895c1b822a2175af8))
- adjust some paths and details ([52c6559](https://github.com/crlang/vue-tony-admin/commit/52c655901ea6402d32b3687ed643d2ba08b35980))
- **CircleProgress:** component optimization ([48238a8](https://github.com/crlang/vue-tony-admin/commit/48238a8eca932cb0bc9185a2d4ab29c4ddb215ce))
- **Excel:** component optimization ([64e0805](https://github.com/crlang/vue-tony-admin/commit/64e08057b9cc8608021b140bc8bbca3096b4f556))
- **Form:** component optimization ([a5e2c01](https://github.com/crlang/vue-tony-admin/commit/a5e2c010ee6ee976fb086a7d55f1147b20f16fc1))
- **Icon:** component optimization ([485145b](https://github.com/crlang/vue-tony-admin/commit/485145ba80b7bf57e35242f984b06d2880344cc3))
- **List:** component optimization ([cf6ed3f](https://github.com/crlang/vue-tony-admin/commit/cf6ed3f74ef759663249eba6a4d4bc6b1443843c))
- **Markdown:** component optimization ([ce7053f](https://github.com/crlang/vue-tony-admin/commit/ce7053f961cad54625ac6e441db882ef19839bcd))
- **Modal:** component optimization ([eb8eda1](https://github.com/crlang/vue-tony-admin/commit/eb8eda17d031a7ebc4b87fbe5139070ec02deca0))
- **PageWrapper:** component optimization ([f5f6359](https://github.com/crlang/vue-tony-admin/commit/f5f6359877ca950b4330b8e17d7c3c9c98797144))
- **Qrcode:** component optimization ([c38b529](https://github.com/crlang/vue-tony-admin/commit/c38b52952920dc6fd8d8a86acad9e2778d7be8cf))
- **Tinymce:** component optimization ([fa793dd](https://github.com/crlang/vue-tony-admin/commit/fa793dd3b18025784c6de07c36d2d380ececbf2f))
- **Transition:** component optimization ([a6f9b8c](https://github.com/crlang/vue-tony-admin/commit/a6f9b8c5b948b71ea4b3f7b1ab991b08abf45a25))
- tree demo optimization ([9bb1a45](https://github.com/crlang/vue-tony-admin/commit/9bb1a453ddeeeed2b91e0a70a627335dace4ae58))
- **Upload:** component optimization ([231e663](https://github.com/crlang/vue-tony-admin/commit/231e663ad5ce05015b7a55e7e4afc77629815a21))
- **Verify:** component optimization ([d0040ee](https://github.com/crlang/vue-tony-admin/commit/d0040ee6fdc08fa3f717034520b891d5848f93aa))

### Features

- add form/table props ([55761fa](https://github.com/crlang/vue-tony-admin/commit/55761fa0cac3f61f259cf6286bd5d93830248112))
- add progress demo ([426eb9a](https://github.com/crlang/vue-tony-admin/commit/426eb9ad82669331a1ad65ffb2b66522d8a42d15))

## [0.1.1-beta.1](https://github.com/crlang/vue-tony-admin/compare/0.0.1-alpha.3...0.1.1-beta.1) (2022-02-13)

### Bug Fixes

- add border property to ElAlert ([8492f93](https://github.com/crlang/vue-tony-admin/commit/8492f93041d1eb1e214d2e4e789a29c32201a030))
- adjust Basic components ([b7ee7f6](https://github.com/crlang/vue-tony-admin/commit/b7ee7f62a0dd85aac8f0988a6971f1494d025581))
- adjust ele button size ([0304bdc](https://github.com/crlang/vue-tony-admin/commit/0304bdc909c4606b249eeecec3c436297502c5f5))
- adjust element plus default color: ([50883cd](https://github.com/crlang/vue-tony-admin/commit/50883cd5d3b30ed4988342fb195efb0cd07ab752))
- adjust header search location ([9d87ca1](https://github.com/crlang/vue-tony-admin/commit/9d87ca19df457b974cc6c0f289dc39c66abfcced))
- **Button:** component optimization ([a0cb821](https://github.com/crlang/vue-tony-admin/commit/a0cb821f51a3d0a13ac11fab324780aa4464ffa3))
- **CardGrid:** component optimization ([2f434c7](https://github.com/crlang/vue-tony-admin/commit/2f434c76265b281b2fb22655bfb6bf072ed2a81b))
- **ClickOutSide:** component optimization ([fb7e8e6](https://github.com/crlang/vue-tony-admin/commit/fb7e8e67cbd0ef843f5a1369a4abb1db014d25ee))
- **CollapseContainer:** component optimization ([6edd70a](https://github.com/crlang/vue-tony-admin/commit/6edd70a710817fb5e9e40a97589830947377a5ae))
- **CountDown:** adjust related parameters ([84a9172](https://github.com/crlang/vue-tony-admin/commit/84a91728068f1f9b4a659ba0d5b6e129e853207a))
- **CountTo:** component optimization ([5426553](https://github.com/crlang/vue-tony-admin/commit/542655317deed93aacb9b1a3018ff131e7264307))
- **Cropper:** component optimization ([0359717](https://github.com/crlang/vue-tony-admin/commit/0359717f609e9534ef88c5dbbf3b98197d559071))
- **Description:** component optimization ([f49bd77](https://github.com/crlang/vue-tony-admin/commit/f49bd776bde6340004d01535bb2abc8a86ba3030))
- **Drawer:** component optimization ([9804d87](https://github.com/crlang/vue-tony-admin/commit/9804d87d90a7aa2cbdde5ae226ea0ba56892ca73))
- fix bugs in the previous version ([c383963](https://github.com/crlang/vue-tony-admin/commit/c3839632413360e2f93a6079f33875f3206fcf9f))
- fix memory overflow caused by v-loading ([0133fa2](https://github.com/crlang/vue-tony-admin/commit/0133fa28f7ad2868c6cc6a9fba811c0f819f6c93))
- fix possible null bug ([4123c91](https://github.com/crlang/vue-tony-admin/commit/4123c91d1705ea72f2940d8e80ad6e547f1232b1))
- fix the basic form demo ([50be741](https://github.com/crlang/vue-tony-admin/commit/50be741600c4f9c8dcab2fbe2c3dcc3c732eafd8))
- fixed empty props causing editor error ([ef8b990](https://github.com/crlang/vue-tony-admin/commit/ef8b99029c9389fafcdd9a6be507ed93abdb6f43))
- **LazyContainer:** component optimization ([32cf073](https://github.com/crlang/vue-tony-admin/commit/32cf073dfd2fd8502ea81b0d38877fbed3f832c2))
- logo title ([8dc4f2c](https://github.com/crlang/vue-tony-admin/commit/8dc4f2cb39911cce52833aac20eae6792accd4cd))
- menu text prohibits being selected ([f261dab](https://github.com/crlang/vue-tony-admin/commit/f261dab8498e11e7ec8b8ada94bd0018b8513dca))
- remove CodeEditor components ([f636e01](https://github.com/crlang/vue-tony-admin/commit/f636e01f7f82e8236ee1b0e3f1f5cfed19d5f230))
- remove img border ([ecd52e4](https://github.com/crlang/vue-tony-admin/commit/ecd52e4d0038c500a2296345ccaf5be3bc6d91b4))
- remove old element props ([4470abf](https://github.com/crlang/vue-tony-admin/commit/4470abf6e0e247bfc142b6b5ccdf9b9cf4c3fad4))
- remove page loading ([4e0971d](https://github.com/crlang/vue-tony-admin/commit/4e0971d8281e4f14d98a542787f4c73a64168dd3))
- rename sass namespace to tonyname ([322dd99](https://github.com/crlang/vue-tony-admin/commit/322dd9961cf4a55d107045aa37693d2b5a90fffb))
- **ScrollContainer:** component optimization ([2bb98ea](https://github.com/crlang/vue-tony-admin/commit/2bb98ead3d227f1f69582105443c2aeb9e9fefca))
- **StrengthMeter:** adjust the password strength check component ([b1b053a](https://github.com/crlang/vue-tony-admin/commit/b1b053a454984b8d56d1eeb2bf9c4bef810c7463))
- **Time:** component optimization ([db52118](https://github.com/crlang/vue-tony-admin/commit/db521187328fda7f129a2e32826b4dbc1a343f40))
- **VirtualScroll:** component optimization ([44997e2](https://github.com/crlang/vue-tony-admin/commit/44997e2e896d4f9571d78c15fc4a93adb87482c6))

### Features

- add theme type ([4f76c6e](https://github.com/crlang/vue-tony-admin/commit/4f76c6eb46f5b042533cea8542e153102fb6d7e8))
- **Button:** add shadow attr ([86730e9](https://github.com/crlang/vue-tony-admin/commit/86730e95b378792963dc0638b1a3bc25f4f371bc))

### Performance Improvements

- element plus component change to import on demand ([4393484](https://github.com/crlang/vue-tony-admin/commit/4393484b26dcf3049ac25b564357e6b354e31628))

## [0.0.1-alpha.3](https://github.com/crlang/vue-tony-admin/compare/0.0.1-alpha.2...0.0.1-alpha.3) (2022-01-19)

### Bug Fixes

- add input border ([6db5465](https://github.com/crlang/vue-tony-admin/commit/6db54659f7efcec12e3caade9bda8218bd00cbfc))
- adjust header lockscreen entry ([7b29c2f](https://github.com/crlang/vue-tony-admin/commit/7b29c2f45a71ecf51338979c7563426ba4f07c8e))
- adjust header tabs doesn't follow header color changes ([39d9135](https://github.com/crlang/vue-tony-admin/commit/39d9135e23abdc8a52a77ce6bafdadbec2dca375))
- adjust lock page ([9b4ddc5](https://github.com/crlang/vue-tony-admin/commit/9b4ddc57866dbce93b2a9961ef0a221d20c873d3))
- adjust tabs style ([8226d65](https://github.com/crlang/vue-tony-admin/commit/8226d65b71a1cda0085282b5f3f6b67acbde27d5))
- date/page header bg ([ff7457f](https://github.com/crlang/vue-tony-admin/commit/ff7457f4ea247ad4f39fc5ce763d11c6d783e908))
- fixed sider/sider menu trigger ([9adfc99](https://github.com/crlang/vue-tony-admin/commit/9adfc99bb7e04efbd046ac816f688aa0f0b81102))
- header change ([046f86d](https://github.com/crlang/vue-tony-admin/commit/046f86df4e84c1091eddf25fb6d304825e0ed196))
- **IconPicker:** fix the problem that the popover cannot be displayed ([8537061](https://github.com/crlang/vue-tony-admin/commit/85370611138b1904b11a1390cbbfffbd5f68a160))
- **modal:** fix warning message ([132ecc4](https://github.com/crlang/vue-tony-admin/commit/132ecc44a3b6a028ba421159f210ec92420c0d26))
- **modal:** header, bottom slot not work ([06f71e6](https://github.com/crlang/vue-tony-admin/commit/06f71e620763c8d2db18ed3be09a9429ddf0c9e6))
- optimize sider/menu/logo ([754ae92](https://github.com/crlang/vue-tony-admin/commit/754ae92d28cf6aa32b5ef86fa3c186e1401969f7))
- the env title spaces will be remove after build ([cdc749a](https://github.com/crlang/vue-tony-admin/commit/cdc749a732a062c92ecf4be5d8453e73d72c0a7b))

### Features

- add favicon ([40deecf](https://github.com/crlang/vue-tony-admin/commit/40deecf6b5560a1dd7fe99e1c6690ae4bb7a814b))
- **CardGrid:** add shadow and card title style ([056dc89](https://github.com/crlang/vue-tony-admin/commit/056dc89fc1433b36304bde0021cf07070339b147))

### Performance Improvements

- adjust login page ([ea89b69](https://github.com/crlang/vue-tony-admin/commit/ea89b69db32f767e18ee06ed42a2caf11c93055e))

## [0.0.1-alpha.2](https://github.com/crlang/vue-tony-admin/compare/v0.0.1-alpha.1...v0.0.1-alpha.2) (2022-01-13)

### Bug Fixes

- adjust the global size small to default ([52a8775](https://github.com/crlang/vue-tony-admin/commit/52a87751fe1500a146ef97e646683988f45826fd))
- build error ([c19c3ea](https://github.com/crlang/vue-tony-admin/commit/c19c3eac3aa57e885007e2116300cbd38a042589))
- **button:** success type color ([d53fa7e](https://github.com/crlang/vue-tony-admin/commit/d53fa7efb8289d6b30da81b8abe651b1707e00cd))
- **CardGrid:** initialization error ([7cdda70](https://github.com/crlang/vue-tony-admin/commit/7cdda703417c34e23a6ec5c404780c4256cfef58))
- **CardGrid:** item css ([19e50a0](https://github.com/crlang/vue-tony-admin/commit/19e50a00aa6e36be12bfa7cbc76e3cf9549a3ebd))

### Performance Improvements

- adjust SCSS variable to custom attribute ([198f820](https://github.com/crlang/vue-tony-admin/commit/198f820ab617857b8588d6bc24e33c4e0dbcf2d4))
