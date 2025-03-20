<script setup>

import { defineProps, defineEmits } from 'vue';
import { NIcon } from 'naive-ui';
import { TrashOutline, CopyOutline, Add, CloseSharp } from "@vicons/ionicons5";

const props = defineProps({
  element: Object,
  content: Object,
  index: Number,
  index1: Number,
  focusIndex: Number,
  addRadio: String
});

const emit = defineEmits(['deleteRadioFn', 'addRadioFn']);
</script>

<template>
  <div class="q-item">
    <div
      class="q-radio"
      v-for="(item, i) in content.answer"
      :key="i"
    >
      <div
        class="icon-radio"
        v-show="element.types === '下拉列表'"
      >{{ i + 1 }}.</div>
      <div
        v-show="['單選題', '多選題'].includes(element.types)"
        class="icon-radio"
        :class="{ 'icon-cirle': element.types === '單選題', 'icon-square': element.types === '多選題' }"
      />
      <input
        class="radio-input"
        v-model="item.description"
        :placeholder="`選項${i + 1}`"
      />
      <n-icon
        size="40"
        @click="emit('deleteRadioFn', index, index1, i)"
      >
        <CloseSharp />
      </n-icon>
    </div>
    <div
      class="q-radio"
      v-if="focusIndex === index"
    >
      <div
        class="icon-radio"
        v-if="element.types === '下拉列表'"
      >
        {{ content.answer.length + 1 }}.
      </div>
      <div
        v-else
        class="icon-radio"
        :class="{ 'icon-cirle': element.types === '單選題', 'icon-square': element.types === '多選題' }"
      />
      <button
        class="radio-add"
        @click="emit('addRadioFn', index, index1)"
      >
        {{ addRadio }}
      </button>
    </div>
  </div>
</template>
<style scoped>
.q-item {
  margin-bottom: 10px;
}

.q-radio {
  margin: 15px auto;
  display: flex;
  align-items: center;
}

.q-radio .icon-radio {
  width: 15px;
  height: 15px;
  border: 2px solid transparent;
  margin-right: 15px;
}

.q-radio .icon-cirle {
  border: 2px solid lightgray;
  border-radius: 50%;
}

.q-radio .icon-square {
  border: 2px solid lightgray;
  border-radius: 0;
}

.q-radio input,
.q-radio button {
  flex: 2;
  margin-right: 15px;
  /* border: 1px solid transparent;*/
}

.q-radio input:focus {
  border-bottom: 1px solid lightgray;
}

.q-radio button:focus {
  border-bottom: 1px solid lightgray;
}

.q-radio .n-icon {
  flex: 1;
  flex-grow: 0;
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.q-radio .radio-add {
  color: var(--green);
  font-weight: bold;
  cursor: pointer;
  flex: 0;
}

.q-radio button {
  flex: 0.2;
  background-color: transparent;
  border: none;
  font-size: 16px;
  text-align: left;
  min-width: 80px;
}
</style>