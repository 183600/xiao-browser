// Copyright 2024 183600
/*
//================================================
    本项目基于chrome-extensions-samples-main修改，并且此文件可能修改了，以下为原项目的版权声明
 Copyright 2023 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
//================================================
*/
// 找到要添加点击事件的按钮元素
var button = document.getElementById("gitee");

// 添加点击事件监听器
button.addEventListener("click", function () {
    // 在点击事件发生后访问链接
  chrome.tabs.create({url: 'https://gitee.com/qwe12345678'});
});

// 找到要添加点击事件的按钮元素
var button = document.getElementById("github");

// 添加点击事件监听器
button.addEventListener("click", function () {
    // 在点击事件发生后访问链接
  chrome.tabs.create({url: 'https://github.com/183600'});
});

// 找到要添加点击事件的按钮元素
var button = document.getElementById("kuan");

// 添加点击事件监听器
button.addEventListener("click", function () {
    // 在点击事件发生后访问链接
  chrome.tabs.create({url: 'https://www.coolapk.com/u/1910517'});
});

// 找到要添加点击事件的按钮元素
var button = document.getElementById("yuanmagitee");

// 添加点击事件监听器
button.addEventListener("click", function () {
    // 在点击事件发生后访问链接
  chrome.tabs.create({url: 'https://gitee.com/qwe12345678/mini-browser'});
});


// 找到要添加点击事件的按钮元素
var button = document.getElementById("yuanmagithub");

// 添加点击事件监听器
button.addEventListener("click", function () {
    // 在点击事件发生后访问链接
  chrome.tabs.create({url: 'https://github.com/183600/xiao-browser'});
});

// 找到要添加点击事件的按钮元素
var button = document.getElementById("qun");

// 添加点击事件监听器
button.addEventListener("click", function () {
    // 在点击事件发生后访问链接
  chrome.tabs.create({url: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=WbDabgCtzAThSJxKavefPPZVO3kRhgQZ&authKey=zWZdBDbcfHfUrBhEGwmmCyd3%2FAiyzuqIPDL121CUukxdPMjJl37fWsuptbW1A69o&noverify=0&group_code=970971601'});
});

// 找到要添加点击事件的按钮元素
var button = document.getElementById("fangwenguanwang");

// 添加点击事件监听器
button.addEventListener("click", function () {
    // 在点击事件发生后访问链接
  chrome.tabs.create({url: 'https://minibrowser7.wordpress.com/'});
});
var result = confirm('请打开设置确保正常运行(只需要打开一次)');
if (result) {
  // 用户点击了确定
  chrome.tabs.create({url: 'options.html'});
}
