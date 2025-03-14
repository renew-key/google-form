<script setup>
import { NTabs, NTabPane } from 'naive-ui';

// 定義接收的 props
const props = defineProps({
  activeTab: String,
  tabs: Array,  // Tab 名稱陣列
});
const activeTab = ref('中文');
// 定義 emit 事件
const emit = defineEmits(['deleteTab', 'AddTab', 'activeTab']);

// 動態生成 closable 屬性，當 tabs 超過 1 時，才可以關閉
const closable = computed(() => props.tabs.length > 1);

// 監聽新增 Tab 的事件
const handleAddTab = () => {
  emit('AddTab');
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
      v-for="panel in props.tabs"
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
