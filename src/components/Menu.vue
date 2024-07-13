<template>
  <div class="menu">
    <div class="header">
      <img src="../utils/icons/menu.png" alt="Menu" />
      <span>Menu</span>
    </div>
    <div class="content">
      <button class="menu-button">
        <img src="../utils/icons/add.png" alt="Add" />
        <span>Add Page</span>
      </button>
      <button class="menu-button">
        <img src="../utils/icons/settings.png" alt="Settings" />
        <span>Settings</span>
      </button>
    </div>
  </div>
</template>

<style>
.menu {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.header {
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.header img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.menu-button {
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 5px;
}

.menu-button img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
</style>