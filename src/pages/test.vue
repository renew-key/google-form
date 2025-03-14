<script setup>
import { useMessage } from "naive-ui";
const message = useMessage();
// 管理所有的 Tab
const tabs = ref(['中文', '英文']);
const addLangVisible = ref(false)
// 當 Tab 被刪除時，從 tabs 陣列中移除
const handleDeleteTab = (tab) => {
  const tabIndex = tabs.value.findIndex(panelName => panelName === tab);
  if (tabIndex !== -1) {
    tabs.value.splice(tabIndex, 1);
  }
};

// 當新增 Tab 時，將新的 Tab 添加到 tabs 陣列
const handleAddTab = () => {
  addLangVisible.value = true;
  // const newTab = '新語言';
  // tabs.value.push(newTab);
};

const handleAddLan = (res) => {
  if (tabs.value.indexOf(res) > -1) {
    message.warning('語言：' + res + '已經添加過了，請檢查一下哦！')
  } else {
    tabs.value.push(res);
  }
}
const handleCloseModal = () => {

  addLangVisible.value = false;

}
</script>

<template>
  <LangModal
    :addLang="addLangVisible"
    @AddLan="handleAddLan"
    @closeModal="handleCloseModal"
  />
  <div class="form-create-wrap">
    <div class="wrap">
      <div class="header">
        <h1 class="form-title">活動報名表單設計</h1>
        <Tab
          :tabs="tabs"
          @deleteTab="handleDeleteTab"
          @AddTab="handleAddTab"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-create-wrap {
  width: 80%;
  min-height: 400px;
  margin: 2rem auto;
}

.wrap {
  min-height: 100px;
  margin: 0 auto;
  display: flex;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .1);
  padding: 2rem 4rem;
}

.header {
  width: 100%;
}

.form-title {
  margin-bottom: 2.5rem;
}
</style>
