<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  element: Object,
  index: Number
});

const emit = defineEmits(['copyListFn', 'deleteListFn', 'addListFn']);
</script>

<template>
  <div class="q-item option-wrap">
    <ul class="option-list">
      <li>
        <n-icon
          size="20"
          class="icon-copy"
          @click="emit('copyListFn', index)"
        >
          <CopyOutline />
        </n-icon>
      </li>
      <li>
        <n-icon
          size="20"
          class="el-icon-delete"
          @click="emit('deleteListFn', index)"
        >
          <TrashOutline />
        </n-icon>
      </li>
      <li>
        <n-icon
          class="el-icon-plus"
          size="20"
          @click="emit('addListFn', index)"
        >
          <Add />
        </n-icon>
      </li>
      <li>
        <span>必填</span>
        <n-switch v-model:value="element.is_required" />
      </li>
    </ul>
  </div>
</template>
