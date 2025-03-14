<template>
  <div>
    <draggable
      v-model="myArray"
      group="people"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
    >
      <template #item="{ element }">
        <div class="item">
          <div>{{ element.name }}</div>
        </div>
      </template>
    </draggable>

    <div v-if="drag">正在拖曳中...</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

const drag = ref(false);

// 模擬的數據
const myArray = ref([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' }
]);
</script>

<style scoped>
.item {
  padding: 10px;
  margin: 5px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: move;
}
</style>
