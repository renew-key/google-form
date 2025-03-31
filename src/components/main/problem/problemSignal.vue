<script setup>
import { NIcon } from 'naive-ui';
import { CloseSharp } from "@vicons/ionicons5";
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable';
import DragOutline from '@/assets/img/drag.png';
import { useFormStyleStore } from "@/stores/formStyle.js";
import { useQuestionStore } from "@/stores/question.js";
import { useFormDataStore } from '@/stores/formData.js'
import { useLangStore } from '@/stores/lang.js'
const LangStore = useLangStore()
const { activeTab } = storeToRefs(LangStore)
const { getCodeByCn } = LangStore
const FormDataStore = useFormDataStore()
const { data } = storeToRefs(FormDataStore)
const formStyleStore = useFormStyleStore();
const { focusIndex } = storeToRefs(formStyleStore);
const questionStore = useQuestionStore();
const { focusItemQuestion } = formStyleStore;
const { addRadio, addOther } = storeToRefs(questionStore)
const { deleteRadioFn, addRadioFn, addOtherFn } = questionStore;

const props = defineProps({
  content: Object,
  b_index: Number,
  q_index: Number,
  c_index: Number
});

// 當你初始化數據時，可以為每個選項分配原始索引
const initAnswers = (answers) => {
  answers.forEach((item, index) => {
    item.originalIndex = index;  // 為每個選項設置 originalIndex
  });
};

// 初始化選項時可以調用此方法

onMounted(() => {
  initAnswers(data.value.content[getCodeByCn(activeTab.value)].block[props.b_index].question[props.q_index].content[props.c_index].answer);
})
</script>

<template>
  <div
    class="q-item"
    v-if="focusIndex === `block_${props.b_index}_q_${props.q_index}`"
  >
    <div
      class="q-radio"
      v-for="(item, i) in content.answer"
      :key="item.answer_id"
    >
      <div class="icon-radio icon-cirle" />
      <div
        v-if="item.isOther"
        class="q-item text-wrap"
      >
        {{ item.description }}
      </div>
      <input
        v-else
        class="radio-input"
        v-model="item.description"
        :placeholder="`選項${i + 1}`"
      />
      <n-icon
        size="40"
        @click="deleteRadioFn(props.b_index, props.q_index, props.c_index, i)"
      >
        <CloseSharp />
      </n-icon>
    </div>
    <div class="q-radio">
      <div class="icon-radio icon-cirle" />
      <button
        class="radio-add"
        @click="addRadioFn(props.b_index, props.q_index, props.c_index)"
      >
        {{ addRadio }}
      </button>
      <section v-if="!content.answer.some(item => item.isOther)">
        <span style="margin-right: 0.2rem;">或</span>
        <button
          style="margin-top: 0.2rem;"
          class="radio-add"
          @click="addOtherFn(props.b_index, props.q_index, props.c_index)"
        >
          {{ addOther }}
        </button>
      </section>
    </div>
  </div>
</template>
<style scoped>
.text-wrap {
  color: var(--grey);
  border-bottom: 1px dotted lightgray;
  padding-bottom: 5px;
  width: 100%;
  text-align: left;
}

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

.icon-radio-list {
  width: 15px;
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

  /* margin-right: 15px;*/
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
  min-width: 70px;
}
</style>
