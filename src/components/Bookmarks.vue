<template>
  <div class="bookmarks">
    <div class="header">
      <img src="../utils/icons/bookmarks.png" alt="Bookmarks" />
      <span>Bookmarks</span>
    </div>
    <div class="content">
      <button class="open-button">
        <img src="../utils/icons/open.png" alt="Open" />
        <span>Open in Mini Browser</span>
      </button>
    </div>
  </div>
</template>

<style>
.bookmarks {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 10px;
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

.open-button {
  display: flex;
  align-items: center;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
}

.open-button img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
</style>