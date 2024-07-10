<template>  
  <div id="app">  
    <Toolbar />  
    <EmbeddedBrowser url="https://example.com" />  
  </div>  
</template>  
  
<script>  
import Toolbar from './components/Toolbar.vue'  
import EmbeddedBrowser from './components/EmbeddedBrowser.vue'  
  
export default {  
  components: {  
    Toolbar,  
    EmbeddedBrowser  
  }  
}  
</script>  
  
<style>  
/* App的样式 */  
</style>