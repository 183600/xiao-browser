<template>
  <PageWrapper title="文件下载示例">
    <el-alert title="根据后台接口文件流下载" />
    <el-button type="primary" class="my-4" @click="handleDownByData">文件流下载</el-button>

    <el-alert title="根据文件地址下载文件" />
    <el-button type="primary" class="my-4" @click="handleDownloadByUrl">文件地址下载</el-button>

    <el-alert title="base64流下载" />
    <el-button type="primary" class="my-4" @click="handleDownloadByBase64">base64流下载</el-button>

    <el-alert title="图片Url下载,如果有跨域问题，需要处理图片跨域" />
    <el-button type="primary" class="my-4" @click="handleDownloadByOnlineUrl">图片Url下载</el-button>
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton, ElAlert } from 'element-plus'
import { downloadByUrl, downloadByData, downloadByBase64, downloadByOnlineUrl } from '@/utils/file/download'
import imgBase64 from './imgBase64'

export default defineComponent({
  components: { ElButton, ElAlert },
  setup() {
    function handleDownByData() {
      downloadByData('text content', 'testName.txt')
    }
    function handleDownloadByUrl() {
      downloadByUrl('https://www.7-zip.org/a/7z2107-x64.exe', '7z2107-x64.exe', '_self')
    }

    function handleDownloadByBase64() {
      downloadByBase64(imgBase64, 'moon.svg')
    }

    function handleDownloadByOnlineUrl() {
      downloadByOnlineUrl('https://img-blog.csdnimg.cn/2eb16a7d1ea1418f8e0569331abbfc86.png', '2eb16a7d1ea1418f8e0569331abbfc86.png')
    }
    return {
      handleDownloadByUrl,
      handleDownByData,
      handleDownloadByBase64,
      handleDownloadByOnlineUrl,
    }
  },
})
</script>
