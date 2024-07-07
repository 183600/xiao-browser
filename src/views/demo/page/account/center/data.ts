export interface ListItem {
  title: string
  icon: string
  color?: string
}

export interface TabItem {
  key: string
  name: string
  component: string
}

export const tags: string[] = ['很有想法的', '专注设计', '川妹子', '大长腿', '海纳百川', '前端开发', 'vue3']
export const teams: ListItem[] = [
  {
    icon: 'ep:element-plus',
    title: '科学搬砖组',
    color: '#ff4000',
  },
  {
    icon: 'ep:element-plus',
    title: '中二少年团',
    color: '#7c51b8',
  },
  {
    icon: 'ep:element-plus',
    title: '高逼格设计',
    color: '#00adf7',
  },
  {
    icon: 'ep:element-plus',
    title: '程序员日常',
    color: '#00adf7',
  },
  {
    icon: 'ep:element-plus',
    title: '科学搬砖组',
    color: '#7c51b8',
  },
  {
    icon: 'ep:element-plus',
    title: '程序员日常',
    color: '#ff4000',
  },
]

export const details: ListItem[] = [
  {
    icon: 'ep:element-plus',
    title: '交互专家',
  },
  {
    icon: 'ep:element-plus',
    title: '某某某事业群',
  },
  {
    icon: 'ep:element-plus',
    title: '福建省厦门市',
  },
]

export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '文章',
    component: 'ArticleList',
  },
  {
    key: '2',
    name: '应用',
    component: 'Application',
  },
  {
    key: '3',
    name: '项目',
    component: 'Project',
  },
]

export const articleList = (() => {
  const result: any[] = []
  for (let i = 0; i < 4; i++) {
    result.push({
      title: 'Tony Admin',
      description: ['Tony', '设计语言', 'Typescript'],
      content: '基于Vue Next, TypeScript, Ant Design实现的一套完整的企业级后台管理系统。',
      time: '2020-11-14 11:20',
    })
  }
  return result
})()

export const applicationList = (() => {
  const result: any[] = []
  for (let i = 0; i < 8; i++) {
    result.push({
      title: 'Tony Admin',
      icon: 'ep:element-plus',
      color: '#1890ff',
      active: '100',
      new: '1,799',
      download: 'bx:bx-download',
    })
  }
  return result
})()

export const projectList = (() => {
  const result: any[] = []
  for (let i = 0; i < 8; i++) {
    result.push({
      title: 'Tony Admin',
      content: '基于Vue Next, TypeScript, Ant Design实现的一套完整的企业级后台管理系统。',
    })
  }
  return result
})()
