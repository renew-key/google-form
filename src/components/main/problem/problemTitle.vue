<script setup>
import { NSelect } from "naive-ui";
import { storeToRefs } from 'pinia'
import { useLangStore } from "@/stores/lang.js";
import { useFormDataStore } from "@/stores/formData.js";
import { useFormStyleStore } from "@/stores/formStyle.js";
import { useQuestionStore } from "@/stores/question.js";
const questionStore = useQuestionStore();
const { selectOptions } = storeToRefs(questionStore)
const formDataStore = useFormDataStore();
const formStyleStore = useFormStyleStore();
const { focusIndex } = storeToRefs(formStyleStore);
const { focusBlockTitle, focusItem } = formStyleStore;
const { data } = storeToRefs(formDataStore)
const LangStore = useLangStore();
const { activeTab } = storeToRefs(LangStore)
const { getCodeByCn } = LangStore;
const props = defineProps({
  content: Object,   // 單一語言內容
  element: Object,   // 問題的主要物件
  b_index: Number,     // 問題索引
  q_index: Number,
});
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
      v-show="focusIndex === `block_${b_index}_q_${q_index}`"
      v-model:value="element.types"
      filterable
      placeholder="請選擇問題類型"
      :options="selectOptions"
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

@media (max-width: 920px) {
  .q-title-wrap .q-select {
    flex: 2;
  }
}
</style>