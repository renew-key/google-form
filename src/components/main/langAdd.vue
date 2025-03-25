<script setup>
import { NModal, NButton, NSelect, useMessage } from "naive-ui";
import { storeToRefs } from "pinia";
import { useLangStore } from "@/stores/lang.js";
const LangStore = useLangStore();
const { langSelect, tabs, activeTab } = storeToRefs(LangStore)
const { handleAddLan, getCnByCode } = LangStore;
const message = useMessage()

const addLang = ref(false)
// 定義接收的 props
const props = defineProps({
  addLang: Boolean,  // 接收 addLang 控制顯示
});

// 定義 emit 事件
const emit = defineEmits(['closeModal']);



// 預設語言
const defaultLang = ref('en');

// Modal 內容樣式
const bodyStyle = {
  width: "600px"
};

// 分段樣式
const segmented = {
  content: "soft",
  footer: "soft"
};

// 取消 Modal
const handleCloseModal = () => {
  addLang.value = false;
  emit('closeModal');  // 發送關閉 Modal 的事件
};

// 確認選擇語言
const handleConfirm = () => {
  const isAdded = handleAddLan(defaultLang.value)

  if (isAdded) {
    addLang.value = false;
    handleCloseModal()
  }
  else {
    message.warning(`語言：${getCnByCode(defaultLang.value)} 已經添加過了，請檢查一下哦！`)
  }


};
watch(
  () => props.addLang,
  (newVal) => {
    if (!newVal) {
      addLang.value = false;
      emit('closeModal');  // 如果 addLang 改為 false，發送關閉 Modal 的事件
    } else {
      addLang.value = true;
    }
  }
);

</script>

<template>
  <n-modal
    v-model:show="addLang"
    preset="card"
    :style="bodyStyle"
    title="添加語言"
    :bordered="false"
    size="huge"
    :segmented="segmented"
    @update:show="handleCloseModal"
  >
    <div class="li-item">
      <span class="label">選擇語言</span>
      <n-select
        class="q-select"
        v-model:value="defaultLang"
        filterable
        placeholder="請選擇語言"
        :options="langSelect"
        label-field="cn"
        value-field="code"
      ></n-select>
    </div>

    <div class="dialog-footer">
      <n-button
        type="error"
        @click="handleCloseModal"
        style="margin-right: 1rem;"
      >
        取消
      </n-button>
      <n-button
        type="success"
        @click="handleConfirm"
      >
        確定
      </n-button>
    </div>
  </n-modal>
</template>

<style scoped>
.dialog-footer {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.li-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.li-item .label {
  margin-right: 15px;
}
</style>
