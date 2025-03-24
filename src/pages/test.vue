<script setup>
import { useMessage, NIcon } from "naive-ui";
import { Add } from "@vicons/ionicons5";
const message = useMessage();
const focusIndex = ref(0);
const activeTab = ref('中文');
const isShowAdd = ref(false);
const QuestionAdd = ref(null)

// 定義語言代碼和語言名稱
const langCode = ['cn', 'en', 'kr', 'jp', 'fr', 'de', 'ru', 'sp', 'po', 'it', 'nl', 'id', 'tr', 'thai', 'zh', 'fa', 'ro', 'ar'];
const langList = ['中文', '英文', '韓語', '日語', '法語', '德語', '俄語', '西班牙語', '葡萄牙語', '義大利語', '荷蘭語', '印度語', '土耳其語', '泰語', '繁體中文', '波斯語', '羅馬尼亞語', '阿拉伯語'];

// 管理所有的 Tab
const tabs = ref(['中文']);
const addLangVisible = ref(false);
// 當 Tab 被刪除時，從 tabs 陣列中移除
const handleDeleteTab = (tab) => {
  // console.log(tab)
  const tabIndex = tabs.value.findIndex(panelName => panelName === tab);
  if (tabIndex !== -1) {
    tabs.value.splice(tabIndex, 1);
  }
  if (activeTab.value === tab) {
    activeTab.value = tabs.value.length > 0 ? tabs.value[tabs.value.length - 1] : ''; // 若有其他 tab，切換到第一個；若沒有則設為空
  }
  // console.log(activeTab.value)
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
  focusIndex.value = -1
}
const focusBlockTitle = (event) => {
  let classList = event.target.classList
  if (classList.contains('add-list') || classList.contains('el-icon-plus')) return
  focusIndex.value = -2
}
const handleActiveTab = (res) => {
  activeTab.value = res;
}

const focusItem = (event, i) => {
  // console.log(event)
  let classList = event.target.classList
  if (classList.contains('el-icon-delete') || classList.contains('icon-copy') || focusIndex.value === i) return
  focusIndex.value = i
}


const addListFn = (index) => {
  if (QuestionAdd.value) {
    QuestionAdd.value.handleAddList(index)
  }
  isShowAdd.value = false
}


const handleIndex = (res) => {
  // console.log(res)
  if (res <= 0) {
    isShowAdd.value = true
  } else {
    isShowAdd.value = false
  }
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
    </div>
  </div>
  <div class="form-create-wrap">
    <div class="wrap">
      <BlockTitle
        :langCode="langCode"
        :langList="langList"
        :tabs="tabs"
        :activeTab="activeTab"
        :focusIndex="focusIndex"
        @focusBlockTitle="focusBlockTitle"
        @deleteTab="handleDeleteTab"
        @addTab="handleAddTab"
        @activeTab="handleActiveTab"
      />
      <div
        class="add-list"
        v-show="isShowAdd"
      >
        <n-icon
          @click="addListFn(0)"
          class="el-icon-plus"
          size="20"
        >
          <Add />
        </n-icon>
      </div>
      <QuestionAll
        ref="QuestionAdd"
        :langCode="langCode"
        :langList="langList"
        :tabs="tabs"
        :activeTab="activeTab"
        :focusIndex="focusIndex"
        @focusItem="focusItem"
        @questionsLen="handleIndex"
      />
    </div>
  </div>
</template>
<style scoped>
.form-create-wrap {
  --green: #4ca2ae;
  --grey: rgba(0, 0, 0, .5);
  position: relative;
  width: 80%;

  margin: 2rem auto;
}

.wrap {
  width: 780px;
  min-height: 100px;
  margin: 0 auto;
  display: flex;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .1);
  /*padding: 2rem 4rem;*/
  flex-direction: column;
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
  bottom: 66px;
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



@media (max-width: 920px) {
  .form-create-wrap {
    width: 100%;
    padding-right: 0.2rem;
    margin: 0;
  }

  .form-create-wrap .wrap {
    width: 100%;
  }

}
</style>
