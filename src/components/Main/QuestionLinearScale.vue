<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  content: Object,
  lineOptions: Array,
  lineEndOptions: Array
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
