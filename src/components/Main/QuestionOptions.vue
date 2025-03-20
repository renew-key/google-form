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
