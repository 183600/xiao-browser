interface GroupItem {
  title: string
  icon: string
  desc: string
  date: string
  group: string
}

interface NavItem {
  title: string
  icon: string
  color: string
}

interface DynamicInfoItem {
  avatar: string
  name: string
  date: string
  desc: string
}

export const navItems: NavItem[] = [
  {
    title: '首页',
    icon: 'ep:chrome-filled',
    color: '#1fdaca',
  },
  {
    title: '仪表盘',
    icon: 'ep:eleme',
    color: '#bf0c2c',
  },
  {
    title: '组件',
    icon: 'ep:eleme-filled',
    color: '#e18525',
  },
  {
    title: '系统管理',
    icon: 'ep:shop',
    color: '#3fb27f',
  },
  {
    title: '权限管理',
    icon: 'ep:switch-filled',
    color: '#4daf1bc9',
  },
  {
    title: '图表',
    icon: 'ep:wind-power',
    color: '#00d8ff',
  },
]

export const dynamicInfoItems: DynamicInfoItem[] = [
  {
    avatar: 'http://static.yingyonghui.com/icon/128/6838462.png',
    name: '威廉',
    date: '刚刚',
    desc: `在 <a href="#">开源组</a> 创建了项目 <a href="#">Vue</a>`,
  },
  {
    avatar: 'http://static.yingyonghui.com/icon/128/6342292.png',
    name: '艾文',
    date: '1个小时前',
    desc: `关注了 <a href="#">威廉</a> `,
  },
  {
    avatar: 'http://static.yingyonghui.com/icon/128/6921659.png',
    name: '克里斯',
    date: '1天前',
    desc: `发布了 <a href="#">个人动态</a> `,
  },
  {
    avatar: 'http://static.yingyonghui.com/icon/128/6923522.png',
    name: 'Tony',
    date: '2天前',
    desc: `发表文章 <a href="#">如何编写一个Vite插件</a> `,
  },
  {
    avatar: 'http://static.yingyonghui.com/icon/128/6921659.png',
    name: '皮特',
    date: '3天前',
    desc: `回复了 <a href="#">杰克</a> 的问题 <a href="#">如何进行项目优化？</a>`,
  },
  {
    avatar: 'http://static.yingyonghui.com/icon/128/6342292.png',
    name: '杰克',
    date: '1周前',
    desc: `关闭了问题 <a href="#">如何运行项目</a> `,
  },
  {
    avatar: 'http://static.yingyonghui.com/icon/128/6921659.png',
    name: '威廉',
    date: '1周前',
    desc: `发布了 <a href="#">个人动态</a> `,
  },
  {
    avatar: 'http://static.yingyonghui.com/icon/128/6923467.png',
    name: '威廉',
    date: '2021-04-01 20:00',
    desc: `推送了代码到 <a href="#">Github</a>`,
  },
]

export const groupItems: GroupItem[] = [
  {
    title: 'Github',
    icon: 'http://static.yingyonghui.com/icon/128/6342292.png',
    desc: 'GitHub is a development platform inspired by the way you work.',
    group: '开源组',
    date: '2021-04-01',
  },
  {
    title: 'Vue',
    icon: 'http://static.yingyonghui.com/icon/128/6921659.png',
    desc: ' 渐进式JavaScript 框架',
    group: '算法组',
    date: '2021-04-01',
  },
  {
    title: 'HTML5',
    icon: 'http://static.yingyonghui.com/icon/128/6923522.png',
    desc: 'HTML5是构建Web内容的一种语言描述方式。',
    group: '上班摸鱼',
    date: '2021-04-01',
  },
  {
    title: 'Angular',
    icon: 'http://static.yingyonghui.com/icon/128/6838462.png',
    desc: 'Angular一般指AngularJS。',
    group: 'UI',
    date: '2021-04-01',
  },
  {
    title: 'React',
    icon: 'http://static.yingyonghui.com/icon/128/6924201.png',
    desc: 'React 是用于构建用户界面的 JavaScript 库',
    group: '技术牛',
    date: '2021-04-01',
  },
  {
    title: 'JS',
    icon: 'http://static.yingyonghui.com/icon/128/6923467.png',
    desc: 'JavaScript ( JS ) 是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。',
    group: '架构组',
    date: '2021-04-01',
  },
]
