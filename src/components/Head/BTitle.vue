<script setup>
import { reactive, computed } from 'vue';

// 定義接收的 props
const props = defineProps({
  tabLang: String, // 當前選中的語言
  tabs: Array, // Tab 名稱陣列
  langCode: Array,
  langList: Array,
});

// 設定 name 資料
const name = reactive([{
  questionnaire_title: '',
  desc: '',
  language: 'cn' // 預設語言為 'cn'
}]);

// 計算屬性，將當前選中的語言對應到 language 變數
const currentLang = computed(() => props.langCode[props.langList.indexOf(props.tabLang)]);

watch(currentLang, (newLang) => {
  // 過濾掉 name 中不在 tabs 裡的語言
  name.forEach((item, index) => {
    // console.log(props.tabs.includes(props.langList[props.langCode.indexOf(item.language)]))
    if (!props.tabs.includes(props.langList[props.langCode.indexOf(item.language)])) {
      name.splice(index, 1);  // 刪除不符合條件的項目
    }
  });
  // console.log(name)
  // 檢查 name 中是否已經有該語言，沒有則新增
  if (!name.some(item => item.language === newLang)) {
    name.push({
      questionnaire_title: '',
      desc: '',
      language: newLang
    });
  }
});

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
        style="font-size: 1.2rem;"
        class="title-area"
        placeholder="區塊標題"
        v-model="i.questionnaire_title"
      ></textarea>
    </div>

    <!-- 問卷說明 -->
    <!-- <div class="li">
      <textarea
        placeholder="問卷說明"
        v-model="i.desc"
      ></textarea>
    </div> -->
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
