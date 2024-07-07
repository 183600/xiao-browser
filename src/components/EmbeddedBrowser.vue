<template>  
  <div class="embedded-browser">  
    <iframe :src="url" ref="iframe"></iframe>  
  </div>  
</template>  
  
<script>  
export default {  
  props: {  
    url: {  
      type: String,  
      required: true  
    }  
  },  
  mounted() {  
    // 在这里可以添加与iframe交互的逻辑  
    // 例如：监听iframe的load事件，或者通过contentWindow与iframe中的JavaScript交互  
  }  
}  
</script>  
  
<style scoped>  
/* 嵌入浏览器的样式 */  
</style>