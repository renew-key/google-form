<script setup>
import { useMessage } from "naive-ui";
const message = useMessage();
const focusIndex = ref(0)
const activeTab = ref('中文')
// 管理所有的 Tab
const tabs = ref(['中文', '英文']);
const addLangVisible = ref(false);
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

const focusTitle = (event) => {
  let classList = event.target.classList
  if (classList.contains('add-list') || classList.contains('el-icon-plus')) return
  focusIndex.value = 'title'
}
const handleActiveTab = (res) => {
  activeTab.value = res;
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
      <div
        class="item title"
        @click="focusTitle($event)"
        :class="{ 'title-focus': focusIndex === 'title' }"
      >
        <h1 class="form-title">活動報名表單設計</h1>
        <Tab
          :tabs="tabs"
          @deleteTab="handleDeleteTab"
          @AddTab="handleAddTab"
          @activeTab="handleActiveTab"
        />
        <Title
          :tabs="tabs"
          :tabLang="activeTab"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-create-wrap {
  --green: #4ca2ae;
  --grey: rgba(0, 0, 0, .5);
  position: relative;
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

.form-create-wrap .item {
  width: 100%;
  padding: 16px 24px 24px 42px;
}

.form-create-wrap .title-focus {
  border-left-color: var(--green) !important;
}

.form-create-wrap .title {
  border-left: 3px solid transparent;
  position: relative;
}

.form-create-wrap .add-list {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e9e9e9;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}


.form-title {
  margin-bottom: 2.5rem;
}

@media (min-width: 520px) {
  .form-create-wrap {
    width: 98%;
  }
}

@media (max-width: 920px) {
  .form-create-wrap .wrap {
    width: 98%;
  }
}
</style>
