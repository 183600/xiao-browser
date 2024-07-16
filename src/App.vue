<template>
  <div class="app">
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
    <iframe url=proxyUrl2 />
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
      proxyUrl2: proxyUrl('https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&tn=baidu&wd=vue%E5%B5%8C%E5%85%A5%E7%AC%AC%E4%B8%89%E6%96%B9%E9%A1%B5%E9%9D%A2&oq=vue%2520%25E4%25BB%25A3%25E7%2590%2586&rsv_pq=c98d7376011230f3&rsv_t=4a71p2mmzF6YTForxdKo5ML2wnN6mYKqGJWeu%2FvOATviQ%2FWpN3vpdmr3%2FtI&rqlang=cn&rsv_dl=ts_0&rsv_enter=1&rsv_btype=t&inputT=11309&rsv_sug3=24&rsv_sug1=19&rsv_sug7=100&rsv_sug2=1&prefixsug=vue%2520%25E5%2586%2585%25E5%25B5%258C%25E7%25AC%25AC%25E4%25B8%2589%25E6%2596%25B9&rsp=0&rsv_sug4=12336')
    };
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