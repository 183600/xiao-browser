<template>
  <div class="toolbar">
    <div class="icon">
      <img src="/src/icons/fullscreen_exit.svg" alt="Current Tab" />
    </div>
    <div class="icon">
      <img src="/src/icons/bookmarks.svg" alt="Bookmarks" />
    </div>
    <div class="icon">
      <img src="/src/icons/icon.png" alt="Saved Pages" />
    </div>
    <div class="icon">
      <img src="/src/icons/menu.svg" alt="Menu" />
    </div>
  </div>
</template>

<style>
.toolbar {
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.icon {
  margin: 10px 0;
  cursor: pointer;
}

.icon img {
  width: 24px;
  height: 24px;
}
</style>