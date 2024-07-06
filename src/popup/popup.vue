<template>
    <ul class="popup">
        <li @click="screenshot">区域截图</li>
        <li>配置2</li>
    </ul>
</template>

<script setup>
import { onBeforeMount } from '@vue/runtime-core';

onBeforeMount(()=>{
    // const port = chrome.runtime.connect({name: "popup"});
    // port.postMessage({
    //     cmd:'from_popup'
    // })
    // port.onMessege.addListener((msg)=>{
    //     console.log(msg);
    // })
  chrome.runtime.sendMessage({
    cmd:'popup'
  })
})

const screenshot = () =>{
    const bg = chrome.extension.getBackgroundPage();
    console.log(chrome);
  chrome.runtime.sendMessage({
    cmd:'popup_screenshot'
  })
}
</script>

<style>
ul.popup {
    width: 100px;
    height: 100px;
}

ul.popup li {
  text-align: center;
  padding: 2px;
  cursor: pointer;
}
ul.popup li:hover{
    background: #efefef;
}
</style>