<template>
  <div class="app">
<head>
<meta http-equiv="Content-Security-Policy" content="frame-ancestors *">
</head>
    <div class="toolbar">
      <!-- <button @click="showMenu = !showMenu" class="toolbar-btn">
        <img src="@/icons/menu.svg" alt="Menu" class="toolbar-icon">
      </button> -->
      <div class="menu-button" @click="openBookmark">
        <img src="@/icons/bookmark_border.svg" alt="Menu" class="toolbar-icon">
      </div>
      <div class="menu-button" @click="openCustomPage">
        <img src="@/icons/sort.svg" alt="Menu" class="toolbar-icon">
      </div>
          <div class="menu-button-container">
          <div class="menu-button-container2">
      <div class="menu-button" @click="showMenu = !showMenu">
        <img src="@/icons/menu.svg" alt="Menu" class="toolbar-icon">
      </div>
      </div>
    </div>
    </div>
    <template>
  <div>
    <iframe ref="iframe" src="http://localhost:10101/api/some-path" frameborder="0"></iframe>
  </div>
</template>
    <div class="menu" v-if="showMenu">
      <button @click="addPage" class="menu-btn">
        <img src="@/icons/add.svg" alt="Add Page" class="menu-icon">
        Add Page
      </button>
      <button @click="openSettings" class="menu-btn">
        <img src="@/icons/settings.svg" alt="Settings" class="menu-icon">
        Settings
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'App',
  setup() {
    const currentUrl = ref('')
    const showMenu = ref(false)

    const openCurrentTab = () => {
      // Code to open the current tab
    }

    const openBookmark = () => {
      // Code to open a bookmark
    }

    const openCustomPage = () => {
      // Code to open a custom page
    }

    const addPage = () => {
      // Code to add a new page
    }

    const openSettings = () => {
      // Code to open the settings
    }

    return {
      currentUrl,
      showMenu,
      openCurrentTab,
      openBookmark,
      openCustomPage,
      addPage,
      openSettings
    }
  },
   data() {
    return {
      proxyUrl: `https://zhuanlan.zhihu.com/p/689524098`
    };
  },
    mounted() {
    this.iframe = this.$refs.iframe;
    this.iframeContentWindow = this.iframe.contentWindow;
    this.iframeContentWindow.addEventListener('beforeload', this.beforeLoad);
  },
  methods: {
    beforeLoad(event) {
      event.preventDefault();
      const url = event.target.src;
      const proxyUrl = 'http://localhost:10101/api' + url.substring(url.indexOf('/api'));
      event.target.src = proxyUrl;
    },
  },
  }
</script>

<style>
.app {
  display: flex;
  width: 700px;
  height: 450px;
}

.toolbar {
  display: flex;
  flex-direction: column;
  background-color: transparent;
}

.menu-button-container {
  display: flex;
  align-items: flex-left;
  justify-content: center;
}

.menu-button-container2 {
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  position: absolute;
  width: 70px;
  height: 70px;
}

.menu-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 70px;
  height: 70px;
}


.toolbar-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebebeb;
  border: none;
  cursor: pointer;
  margin-top: 5px;
  width: 50px;
  margin-bottom: 5px;
  height: 50px;
  border-radius: 50%;
}

.custom-page-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebebeb;
  border: none;
  margin-top: 5px;
  cursor: pointer;
  margin-bottom: 5px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.toolbar-icon {
  width: 20px;
  height: 20px;
}

.mini-browser {
  flex: 1;
  overflow: hidden;
}

.mini-browser iframe {
  width: 100%;
  height: 100%;
}

.menu {
  position: absolute;
  background-color: #f1f1f1;
  padding: 10px;
  border: 1px solid #ccc;
}

.menu-btn {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>