<script setup>
import { NTabs, NTabPane } from 'naive-ui';
import { storeToRefs } from "pinia";
import { useLangStore } from "@/stores/lang.js";
const LangStore = useLangStore();
const { langSelect, tabs, activeTab } = storeToRefs(LangStore)
const { handleAddLan, handleDeleteTab } = LangStore;

const emit = defineEmits(['deleteTab', 'AddTab', 'activeTab']);


// 動態生成 closable 屬性，當 tabs 超過 1 時，才可以關閉
const closable = computed(() => {
  // console.log(tabs.value.length)
  return tabs.value.length > 1
}
);

// 監聽新增 Tab 的事件
const handleAddTab = () => {
  emit('AddTab');
  // console.log("111")
};

// 處理刪除 Tab 的事件
const handleClose = (name) => {
  emit('deleteTab', name);
};

const handleTabChange = () => {
  emit('activeTab', activeTab.value);
}
</script>

<template>
  <n-tabs
    animated
    type="card"
    :addable="true"
    :closable="closable"
    tab-style="min-width: 80px;"
    v-model:value="activeTab"
    @update:value="handleTabChange"
    @close="handleClose"
    @add="handleAddTab"
  >
    <n-tab-pane
      v-for="panel in tabs"
      :key="panel"
      :name="panel"
    >
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped>
.tabs-wrapper {
  width: 100%;
  padding-bottom: 1rem;
}

.tabs {
  padding: 1rem;
  width: 100%;
  background-color: white;
  border-bottom: 1px rgb(228, 227, 227) solid;
}

.tab-choose {
  border: 1px rgb(228, 227, 227) solid;
  border-bottom: 1px white solid;
  background-color: white;
}
</style>
