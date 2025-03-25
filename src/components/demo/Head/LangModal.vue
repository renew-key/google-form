<script setup>
import { NModal, NButton, NSelect } from "naive-ui";
const addLang = ref(false)
// 定義接收的 props
const props = defineProps({
  addLang: Boolean,  // 接收 addLang 控制顯示
});

// 定義 emit 事件
const emit = defineEmits(['AddLan', 'closeModal']);



// 預設語言
const defaultLang = ref('英文');

// 語言選項
const options = [
  {
    label: "中文",
    value: "中文",
  },
  {
    label: "英文",
    value: "英文"
  },
];

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
  emit('AddLan', defaultLang.value);  // 發送新增語言的事件
  addLang.value = false;
  handleCloseModal()
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
        :options="options"
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
