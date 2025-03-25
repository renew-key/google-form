<script setup>
import { storeToRefs } from "pinia";
import { useLangStore } from "@/stores/lang.js";
import { useFormDataStore } from "@/stores/formData.js";
const formDataStore = useFormDataStore();

const { data } = storeToRefs(formDataStore)
const LangStore = useLangStore();
const { activeTab } = storeToRefs(LangStore)
const { getCodeByCn } = LangStore;


</script>

<template>
  <div>
    <!-- 問卷標題 -->
    <div class="li">
      <textarea
        style="font-size: 1.2rem;"
        class="title-area"
        placeholder="問卷標題"
        v-model="data.content[getCodeByCn(activeTab)].questionnaire_name"
      ></textarea>
    </div>

    <!-- 問卷說明 -->
    <div class="li">
      <textarea
        placeholder="問卷說明"
        v-model="data.content[getCodeByCn(activeTab)].desc"
      ></textarea>
    </div>
  </div>
</template>

<style scoped>
.form-create-wrap .li {
  position: relative;
  margin-bottom: 0.5rem;
  width: 100%;
  /* 確保有足夠的寬度讓伪元素顯示 */
}

.form-create-wrap .li:after {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: 1rem;
  left: 0;
  transform: scaleX(0);
  background-color: var(--green);
  /* 確保這個變數正確定義 */
  transition: transform 0.3s ease, background-color 0.3s ease;
  /* 確保 transition 正確 */
}

.form-create-wrap .li:hover:after {
  transform: scaleX(1);
  /* 在 hover 時顯示 */
  background-color: var(--green);
  /* 確保背景顏色在 hover 時有變化 */
}

.form-create-wrap .li .title-area {
  font-size: 1.2rem;
  all: unset;
}

.form-create-wrap .li .title-area::-webkit-input-placeholder {
  font-size: 1.2rem;
}

.form-create-wrap input::-webkit-input-placeholder,
.form-create-wrap textarea::-webkit-input-placeholder {
  color: rgba(0, 0, 0, .5);
}
</style>
