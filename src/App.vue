<template>
  <div class="app">
    <div class="toolbar">
      <button @click="openCurrentTab" class="toolbar-btn">
        <img src="@/icons/fullscreen_exit.svg" alt="Open Current Tab" class="toolbar-icon">
        Open Current Tab
      </button>
      <button @click="openBookmark" class="toolbar-btn">
        <img src="@/icons/bookmark_border.svg" alt="Open Bookmark" class="toolbar-icon">
        Open Bookmark
      </button>
      <button @click="openCustomPage" class="toolbar-btn">
        <img src="@/icons/sort.svg" alt="Open Custom Page" class="toolbar-icon">
        Open Custom Page
      </button>
      <button @click="showMenu = !showMenu" class="toolbar-btn">
        <img src="@/icons/menu.svg" alt="Menu" class="toolbar-icon">
        Menu
      </button>
    </div>
    <div class="mini-browser">
      <iframe :src="currentUrl" frameborder="0"></iframe>
    </div>
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
  }
}
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 600px;
}

.toolbar {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #f1f1f1;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.toolbar-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
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