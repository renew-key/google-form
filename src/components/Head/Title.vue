<script setup>
import { reactive, computed } from 'vue';

// 定義語言代碼和語言名稱
const langCode = ['cn', 'en', 'kr', 'jp', 'fr', 'de', 'ru', 'sp', 'po', 'it', 'nl', 'id', 'tr', 'thai', 'zh', 'fa', 'ro', 'ar'];
const langList = ['中文', '英文', '韓語', '日語', '法語', '德語', '俄語', '西班牙語', '葡萄牙語', '義大利語', '荷蘭語', '印度語', '土耳其語', '泰語', '繁體中文', '波斯語', '羅馬尼亞語', '阿拉伯語'];

// 定義接收的 props
const props = defineProps({
  tabLang: String, // 當前選中的語言
  tabs: Array, // Tab 名稱陣列
});

// 設定 name 資料
const name = reactive([{
  questionnaire_name: '',
  desc: '',
  language: 'cn' // 預設語言為 'cn'
}]);

// 計算屬性，將當前選中的語言對應到 language 變數
const currentLang = computed(() => langCode[langList.indexOf(props.tabLang)]);

// 篩選出對應語言的問卷項目
const filteredName = computed(() => {
  return name.filter(item => item.language === currentLang.value);
});
</script>

<template>
  <div
    v-for="i in filteredName"
    :key="i.language"
  >
    <!-- 問卷標題 -->
    <div class="li">
      <textarea
        class="title-area"
        placeholder="問卷標題"
        v-model="i.questionnaire_name"
      ></textarea>
    </div>

    <!-- 問卷說明 -->
    <div class="li">
      <textarea
        placeholder="問卷說明"
        v-model="i.desc"
      ></textarea>
    </div>
  </div>
</template>

<style scoped>
.form-create-wrap .li {
  position: relative;
  margin-bottom: 15px;
  width: 100%;
  /* 確保有足夠的寬度讓伪元素顯示 */
}

.form-create-wrap .li:after {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: -1px;
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
  font-size: 20px;
  all: unset;
}

.form-create-wrap .li .title-area::-webkit-input-placeholder {
  font-size: 20px;
}

.form-create-wrap input::-webkit-input-placeholder,
.form-create-wrap textarea::-webkit-input-placeholder {
  color: rgba(0, 0, 0, .5);
}
</style>
