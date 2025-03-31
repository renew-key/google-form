<script setup>
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable';
import DragOutline from '@/assets/img/drag.png';
import { useLangStore } from "@/stores/lang.js";
import { useFormDataStore } from "@/stores/formData.js";
import { useFormStyleStore } from "@/stores/formStyle.js";
import { useQuestionStore } from "@/stores/question.js";
const questionStore = useQuestionStore();
const { selectOptions } = storeToRefs(questionStore)
const formDataStore = useFormDataStore();
const formStyleStore = useFormStyleStore();
const { focusIndex } = storeToRefs(formStyleStore);
const { focusItem } = formStyleStore;
const { data } = storeToRefs(formDataStore)
const LangStore = useLangStore();
const { activeTab } = storeToRefs(LangStore)
const { getCodeByCn } = LangStore;

const props = defineProps({
  index: Number,
});
</script>
<template>
  <div class="q-wrap">
    <draggable
      v-model="data.content[getCodeByCn(activeTab)].block[props.index].question"
      group="question"
      item-key="question_id"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element, index }">
        <div
          class="q-li"
          @click="focusItem($event, `block_${props.index}_q_${index}`)"
          :class="{ 'q-li-focus': focusIndex === `block_${props.index}_q_${index}` }"
        >
          <div class="drap-area">
            <img
              :src="DragOutline"
              alt="Drag Icon"
              width="20"
              height="20"
            />
          </div>
          <div
            class="q-item-wrap"
            v-for="(content, c_index) in element.content"
          >
            <problemTitle
              :content="content"
              :element="element"
              :q_index="index"
              :b_index="props.index"
            />

            <problemText v-if="element.types === '文本題'" />

            <problemLinearScale
              :content="content"
              v-if="element.types === '線性量表'"
            />
            <problemSignal
              :content="content"
              :b_index="props.index"
              :q_index="index"
              :c_index="c_index"
              v-if="element.types === '單選題'"
            />
            <!-- <problemFooter :b_index="props.index" /> -->
          </div>
        </div>
      </template>
    </draggable>
  </div>

</template>
<style scoped>
.q-item-wrap {
  padding: 16px 24px 24px 42px;
}

.q-wrap .q-li {
  border-left: 3px solid transparent;
}

.form-create-wrap .q-wrap .q-li-focus {
  border-left-color: var(--green) !important;
  box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 6px 0 rgba(0, 0, 0, 0.24);

}

.q-wrap .drap-area {
  padding: 5px;
  cursor: move;
}

.q-item {
  margin-bottom: 10px;
}

.q-title-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 25px !important;
}

.q-title-wrap .q-index {
  flex: 1;
  flex-grow: 0;
  margin-right: 10px;
}

.q-title-wrap .q-title {
  flex: 1;
  flex-grow: 2;
}

.q-title-wrap .q-select {
  flex: 1;
  flex-shrink: 0;
}

.li .title-area {
  font-size: 20px;
  all: unset;
}

.li .title-area::-webkit-input-placeholder {
  font-size: 20px;
}

.li .q-area {
  font-size: 18px;
}

.li .q-area::-webkit-input-placeholder {
  font-size: 18px;
}

textarea {
  background-color: transparent;
  border: none;
  resize: none;
  display: block;
  width: 100%;
  height: 35px;
}

@media (max-width: 920px) {
  .q-title-wrap .q-select {
    flex: 2;
  }
}
</style>