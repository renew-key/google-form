<script setup>
import { defineProps, defineEmits } from 'vue';
import { TrashOutline, CopyOutline, Add, CloseSharp } from "@vicons/ionicons5";
import { NIcon, NSwitch, NCheckbox, NTabs, NModal, useMessage, NButton, NTabPane, NSelect } from "naive-ui";

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
          @click="emit('copyListFn', $event, index)"
        >
          <CopyOutline />
        </n-icon>
      </li>
      <li>
        <n-icon
          size="20"
          class="el-icon-delete"
          @click="emit('deleteListFn', $event, index)"
        >
          <TrashOutline />
        </n-icon>
      </li>
      <li>
        <n-icon
          class="el-icon-plus"
          size="20"
          @click="emit('addListFn', $event, index)"
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
<style scoped>
.option-wrap {
  overflow: hidden;
  border-top: 1px solid lightgray;
}

.option-wrap .option-list {
  float: right;
}

.option-wrap .option-list li {
  display: flex;
  justify-items: center;
  align-items: center;
  float: left;
  list-style: none;
  margin: 20px 10px 20px 25px;
}

.option-wrap .option-list .icon-copy {
  font-size: 20px;
}

.option-wrap .option-list .el-icon-delete {
  font-size: 21px;
  vertical-align: middle;
}

.option-wrap .option-list i {
  cursor: pointer;
}

.option-wrap .lang-li {
  margin: 15px 8px;
  display: flex;
  align-items: center;
}

.option-wrap .option-list .lang-li span {
  margin-left: 10px;
  cursor: pointer;
  color: var(--green);
  font-weight: bold;
}

.option-wrap .option-list .el-select {
  width: 120px;
}
</style>
