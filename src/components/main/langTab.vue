<script setup>
import { NTabs, NTabPane, useDialog } from 'naive-ui';
import { storeToRefs } from "pinia";
import { useLangStore } from "@/stores/lang.js";
const LangStore = useLangStore();
const { tabs, activeTab } = storeToRefs(LangStore)
const { handleAddTab, handleDeleteTab } = LangStore;

const dialog = useDialog();
// 動態生成 closable 屬性，當 tabs 超過 1 時，才可以關閉
const closable = computed(() => {
  return tabs.value.length > 1
}
);

const handleDelete = (lang) => {
  dialog.warning({
    title: "刪除語言",
    content: `確定要刪除${lang}`,
    positiveText: "確定",
    negativeText: "取消",
    draggable: true,
    onPositiveClick: () => {
      handleDeleteTab(lang)
    },
    onNegativeClick: () => {
      message.error("Not Sure");
    }
  });
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
    @close="handleDelete"
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
