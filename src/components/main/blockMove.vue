<script setup>
import { IosArrowDown } from "@vicons/ionicons4";
import DragOutline from '@/assets/img/drag.png';
import { useBlockStore } from "@/stores/block.js";
import { NCard, NIcon, NButton } from "naive-ui";
import { useFormDataStore } from "@/stores/formData.js";
import { storeToRefs } from 'pinia'
import { useLangStore } from "@/stores/lang.js";
import draggable from "vuedraggable";
const formDataStore = useFormDataStore();
const { data } = storeToRefs(formDataStore)
const blockStore = useBlockStore();
const { moveBlock, onDragEnd, confirmMove, cancelMove } = blockStore;
const { tempBlocks } = storeToRefs(blockStore)
const LangStore = useLangStore();
const { activeTab } = storeToRefs(LangStore)
const { getCodeByCn } = LangStore;
const emit = defineEmits(['closeShow']);
const handleSave = () => {
  confirmMove();
  emit('closeShow', false)
}
const handleClear = () => {
  emit('closeShow', false)
}

</script>
<template>
  <n-card
    style="width: 400px"
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
  >

    <draggable
      v-model="tempBlocks"
      group="people"
      item-key="block_id"
      @start="drag = true"
      @end="drag = false"
    >
      <template #header>
        <h3 class="card-title">重新排序區段</h3>
        <p class="card-title-2">在重新排序後驗證區段導覽邏輯</p>
      </template>

      <template #item="{ element, index }">

        <div class="wrapper-block">
          <section class="draggable">
            <img
              :src="DragOutline"
              alt="Drag Icon"
              width="20"
              height="20"
            />
          </section>
          <section class="contain">
            <span class="block-title">{{ element?.blockTitle?.questionnaire_blockTitle || '未命名區段' || '未命名區段' }}</span>
            <span class="block-name">區段{{ element.order }} (共{{ data.content[getCodeByCn(activeTab)].block.length
            }}區塊)</span>
          </section>
          <section class="buttonSelection">
            <button
              class="arrow"
              @click="moveBlock(index, index - 1)"
              :disabled="index == 0"
            >
              <n-icon
                size="20"
                class="rotate"
              >
                <IosArrowDown />
              </n-icon>
            </button>

            <button
              class="arrow"
              @click="moveBlock(index, index + 1)"
              :disabled="index == tempBlocks.length - 1"
            >
              <n-icon size="20">
                <IosArrowDown />
              </n-icon>
            </button>

          </section>
        </div>
      </template>
    </draggable>
    <template #footer>
      <section class="footer">
        <n-button
          quaternary
          class="btn-word"
          @click="handleClear"
        >
          取消
        </n-button>
        <n-button
          class="btn-word"
          quaternary
          type="primary"
          @click="handleSave"
        >
          儲存
        </n-button>
      </section>
    </template>
  </n-card>
</template>
<style scoped>
::v-deep(.n-card-header) {
  padding: 0 !important;
}

::v-deep(.n-card__content) {
  padding: 0 !important;
}

::v-deep(.n-card__footer) {
  padding: 0 !important;
}

.rotate {
  transform: rotate(180deg);
}

.arrow {
  padding: 1rem 0.5rem;
  background-color: transparent;
  border: none;
}

.card-title {
  font-size: 1.2rem;
  padding-left: 1rem;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}

.card-title-2 {
  font-size: 0.8rem;
  padding-left: 1rem;
  padding-bottom: 0.5rem;
}


.footer {
  display: flex;
  justify-content: end;
  padding: 0.8rem 0rem;
}

.btn-word {
  font-size: 1rem;
}

.wrapper-block {
  display: flex;
  flex-direction: row;
  border: 1px rgb(217, 217, 217) solid;
}

.wrapper-block:hover {
  border-left: 3px solid #4ca2ae;

}

.draggable {
  flex: 1;
  padding-left: 0.7rem;
  padding-top: 1rem;
  justify-content: left;
}

.buttonSelection {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.contain {
  display: flex;
  flex-direction: column;
  flex: 8;
  justify-content: left;
}

.block-title {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>