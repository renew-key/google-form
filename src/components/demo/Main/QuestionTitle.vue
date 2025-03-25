<script setup>
import { NSelect } from "naive-ui";

const props = defineProps({
  content: Object,   // 單一語言內容
  element: Object,   // 問題的主要物件
  index: Number,     // 問題索引
  focusIndex: [String, Number],
});

const selectOptions = [
  {
    label: "單選題",
    value: "單選題",
  }, {
    label: "多選題",
    value: "多選題",
  }, {
    label: "下拉列表",
    value: "下拉列表",
  }, {
    label: "線性量表",
    value: "線性量表",
  }, {
    label: "文本題",
    value: "文本題",
  }
]

const emit = defineEmits(["updateType"]);
</script>

<template>
  <div class="q-item q-title-wrap">
    <div class="q-title">
      <div class="li">
        <textarea
          class="q-area"
          placeholder="問題"
          v-model="content.title"
        ></textarea>
      </div>
    </div>
    <n-select
      class="q-select"
      v-show="focusIndex === index"
      v-model:value="element.types"
      filterable
      placeholder="請選擇問題類型"
      :options="selectOptions"
      @update:value="emit('updateType', $event)"
    />
  </div>
</template>

<style scoped>
.q-item-wrap {
  padding: 16px 24px 24px 42px;
}

.q-item {
  margin-bottom: 10px;
}

.q-title-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 25px !important;
}

.q-title-wrap .q-index {
  flex: 1;
  flex-grow: 0;
  margin-right: 10px;
}

.q-title-wrap .q-title {
  flex: 1;
  flex-grow: 2;
}

.q-title-wrap .q-select {
  flex: 1;
  flex-shrink: 0;
}

.li .title-area {
  font-size: 20px;
  all: unset;
}

.li .title-area::-webkit-input-placeholder {
  font-size: 20px;
}

.li .q-area {
  font-size: 18px;
}

.li .q-area::-webkit-input-placeholder {
  font-size: 18px;
}

textarea {
  background-color: transparent;
  border: none;
  resize: none;
  display: block;
  width: 100%;
  height: 35px;
}
</style>
