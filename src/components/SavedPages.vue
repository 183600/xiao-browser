<template>
  <div class="saved-pages">
    <div class="header">
      <img src="../utils/icons/saved-pages.png" alt="Saved Pages" />
      <span>Saved Pages</span>
    </div>
    <div class="content">
      <button v-for="page in savedPages" :key="page.id" class="page-button">
        <span>{{ page.title.charAt(0) }}</span>
        <span>{{ page.title }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      savedPages: [
        { id: 1, title: 'Google' },
        { id: 2, title: 'Wikipedia' },
        { id: 3, title: 'GitHub' },
        { id: 4, title: 'Vue.js' },
      ],
    };
  },
};
</script>

<style>
.saved-pages {
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

.page-button {
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

.page-button span:first-child {
  background-color: #4CAF50;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}
</style>