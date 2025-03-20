<script setup>
import { useMessage, NIcon } from "naive-ui";
import { TrashOutline, CopyOutline, Add, CloseSharp } from "@vicons/ionicons5";
const message = useMessage();
const focusIndex = ref("0");
const activeTab = ref('中文');
const isShowTop = ref(false);

// 定義語言代碼和語言名稱
const langCode = ['cn', 'en', 'kr', 'jp', 'fr', 'de', 'ru', 'sp', 'po', 'it', 'nl', 'id', 'tr', 'thai', 'zh', 'fa', 'ro', 'ar'];
const langList = ['中文', '英文', '韓語', '日語', '法語', '德語', '俄語', '西班牙語', '葡萄牙語', '義大利語', '荷蘭語', '印度語', '土耳其語', '泰語', '繁體中文', '波斯語', '羅馬尼亞語', '阿拉伯語'];

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

const addListFn = (index) => {

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
      <FormTitle
        :langCode="langCode"
        :langList="langList"
        :tabs="tabs"
        :activeTab="activeTab"
        :focusIndex="focusIndex"
        @focusTitle="focusTitle"
        @deleteTab="handleDeleteTab"
        @addTab="handleAddTab"
        @activeTab="handleActiveTab"
      />
      <div class="add-list">
        <n-icon
          @click="addListFn"
          class="el-icon-plus"
          size="20"
        >
          <Add />
        </n-icon>
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
  width: 780px;
  min-height: 100px;
  margin: 0 auto;
  display: flex;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .1);
  padding: 2rem 4rem;
}

.form-create-wrap .add-list {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .24);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.el-icon-plus {
  background-color: #fff;
}

/*.form-sidebar {
  flex: 1;
  flex-grow: 0;
  align-self: flex-end;
  display: inline-block;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .24);
}

.form-sidebar .sidebar-li {
  cursor: pointer;
  padding: 10px 12px;
}*/

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
