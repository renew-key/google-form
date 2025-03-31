<script setup>
import { NSelect } from "naive-ui";
const lineOptions = [
  {
    label: "0",
    value: "0"
  },
  {
    label: "1",
    value: "1"
  }
]
const lineEndOptions = [

  ...Array.from({ length: 8 }, (_, i) => ({
    label: (i + 2).toString(),
    value: (i + 2).toString()
  }))
];
const props = defineProps({
  content: Object,
});
</script>

<template>
  <div class="q-item line-wrap">
    <div class="q-item-line">
      <n-select
        v-model:value="content.line_answer.line_value"
        :options="lineOptions"
      />
      <span class="line-tip">到</span>
      <n-select
        v-model:value="content.line_answer.line_end_value"
        :options="lineEndOptions"
      />
    </div>
    <div class="q-radio">
      <div class="icon-radio">1.</div>
      <input
        class="radio-input"
        v-model="content.line_answer.line_tag"
        placeholder="標籤（選填）"
      />
    </div>
    <div class="q-radio">
      <div class="icon-radio">2.</div>
      <input
        class="radio-input"
        v-model="content.line_answer.line_end_tag"
        placeholder="標籤（選填）"
      />
    </div>
  </div>
</template>
<style scoped>
.q-item {
  margin-bottom: 10px;
}

.line-wrap .q-item-line {
  display: flex;

  align-items: center;
}

.line-wrap .q-item-line .el-select {

  width: 70px;
}

.q-item-line .el-input {
  border: none !important;
}

.line-wrap .line-tip {
  padding: 15px;
}

.q-radio {
  margin: 15px auto;
  display: flex;
  align-items: center;
}

.q-radio .icon-radio {
  width: 15px;
  border: 2px solid transparent;
  margin-right: 15px;
}

.q-radio input,
.q-radio button {
  flex: 2;
  margin-right: 15px;
  /* border: 1px solid transparent;*/
}

.q-radio input {
  border-bottom: 1px solid lightgray !important;
}

.q-radio button {
  border-bottom: 1px solid lightgray !important;
}

.q-radio input:focus {
  border-bottom: 1px solid lightgray;
}

.q-radio button:focus {
  border-bottom: 1px solid lightgray;
}

.line-wrap .q-item-line {
  display: flex;
  align-items: center;
}
</style>
