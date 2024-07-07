<template>
  <PageWrapper title="关于">
    <template #extra>
      <a :href="GITHUB_URL" target="_blank" style="color: var(--primary-color)">
        {{ name }}
      </a>
      是一个基于Vue3.0、Vite、 Ant-Design-Vue 、TypeScript 的后台解决方案，目标是为中大型项目开发,提供现成的开箱解决方案及丰富的示例,原则上不会限制任何代码用于商用。
    </template>
    <BasicDescription @register="infoRegister" />
    <BasicDescription @register="register" class="my-4" />
    <BasicDescription @register="registerDev" />
  </PageWrapper>
</template>
<script lang="ts" setup>
import { BasicDescription, DescItem, useDescription } from '@/components/BasicDescription'
import { GITHUB_URL, SITE_URL, DOC_URL } from '@/settings/siteSetting'

const { pkg, lastBuildTime } = __APP_INFO__

const { dependencies, devDependencies, name, version } = pkg

const schema: DescItem[] = []
const devSchema: DescItem[] = []

const infoSchema: DescItem[] = [
  {
    label: '版本',
    field: 'version',
  },
  {
    label: '最后编译时间',
    field: 'lastBuildTime',
  },
  {
    label: '文档地址',
    field: 'doc',
  },
  {
    label: '预览地址',
    field: 'preview',
  },
  {
    label: 'Github',
    field: 'github',
  },
]

const infoData = {
  version,
  lastBuildTime,
  doc: DOC_URL,
  preview: SITE_URL,
  github: GITHUB_URL,
}

Object.keys(dependencies).forEach((key) => {
  schema.push({ field: key, label: key })
})

Object.keys(devDependencies).forEach((key) => {
  devSchema.push({ field: key, label: key })
})

const [register] = useDescription({
  title: '生产环境依赖',
  border: true,
  data: dependencies,
  schema: schema,
  column: 3,
})

const [registerDev] = useDescription({
  title: '开发环境依赖',
  border: true,
  data: devDependencies,
  schema: devSchema,
  column: 3,
})

const [infoRegister] = useDescription({
  title: '项目信息',
  border: true,
  data: infoData,
  schema: infoSchema,
  column: 2,
})
</script>
