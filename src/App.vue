<template>
  <div class="app">
    <div class="toolbar">
      <button @click="openCurrentTab" class="toolbar-btn">
        <img src="@/icons/fullscreen_exit.svg" alt="Open Current Tab" class="toolbar-icon">
      </button>
      <button @click="openBookmark" class="toolbar-btn">
        <img src="@/icons/bookmark_border.svg" alt="Open Bookmark" class="toolbar-icon">
      </button>
      <button @click="openCustomPage" class="custom-page-btn">
        <img src="@/icons/sort.svg" alt="Open Custom Page" class="toolbar-icon">
      </button>
      <button @click="showMenu = !showMenu" class="toolbar-btn">
        <img src="@/icons/menu.svg" alt="Menu" class="toolbar-icon">
      </button>
          <div class="menu-button-container">
      <div class="menu-button" onclick="showMenu()">
        <img src="@/icons/menu.svg" alt="Menu" class="toolbar-icon">
      </div>
    </div>
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
  width: 700px;
  height: 450px;
}

.toolbar {
  display: flex;
  flex-direction: column;
  padding: 2px;
  background-color: transparent;
}

.menu-button-container {
  margin-left: auto;
  display: flex;
  align-items: flex-end;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}

.menu-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  border: none;
  cursor: pointer;
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