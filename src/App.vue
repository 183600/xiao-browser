<template>  
  <div class="popup-container">  
    <div class="toolbar">  
      <toolbar />  
    </div>  
    <div class="iframe-container">  
      <iframe-container />  
    </div>  
  </div>  
</template>  

<script>  
import Toolbar from './components/Toolbar.vue';  
import IframeContainer from './components/IframeContainer.vue';  

export default {  
  components: {  
    Toolbar,  
    IframeContainer  
  }  
}  
</script>  

<style scoped>  
.popup-container {  
  display: flex;  
  flex-direction: column;  
  height: 100%;  
}  
.toolbar {  
  /* 工具栏样式 */  
}  
.iframe-container {  
  flex: 1;  
  border: none;  
  overflow: hidden;  
  position: relative;  
}  
.iframe-container iframe {  
  width: 100%;  
  height: 100%;  
  border: none;  
}  
</style>