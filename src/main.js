import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
    fetch('https://www.zhihu.com/question/574888850')
        .then(response => response.text())
        .then(html => {
          // 监听页面上所有链接的点击事件
document.addEventListener('click', function(event) {
  var target = event.target;
    // 获取点击的链接的 URL
    var url = target.getAttribute('href');
    alert('Clicked link:', url);

    // 在这里添加你想要执行的操作,例如记录点击事件或者执行其他逻辑
    // ...
}, false);
          document.getElementById('webpage-container').innerHTML = html;
        });