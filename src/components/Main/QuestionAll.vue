<script setup>
import { ref, reactive, nextTick } from 'vue';
import draggable from 'vuedraggable';
import DragOutline from '@/assets/img/drag.png';
import { NIcon, useMessage } from 'naive-ui';

const addRadio = ref('添加選項');

const props = defineProps({
  tabs: Array,
  langCode: Array,
  langList: Array,
  activeTab: String,
  focusIndex: [String, Number],
});

const questions = reactive([
  {
    question_id: 1,
    types: '單選題',
    is_required: false,
    content: [
      {
        language: 'cn',
        title: '',
        answer: [{ answer_id: 1, description: null }],
        line_answer: { line_value: 1, line_end_value: 5, line_tag: '', line_end_tag: '' },
        text_answer: ''
      }
    ]
  }
]);

const onMove = () => {
  questions.forEach((q, i) => (q.question_id = i + 1));
};

const handleDeleteRadioFn = (i, j, k) => {
  questions[i].content[j].answer.splice(k, 1);
};

const handleAddRadioFn = (i, j) => {
  let list = questions[i].content[j].answer;
  addFormFn(list);
};

const addFormFn = (list) => {
  list.push({ answer_id: list.length + 1, description: null });
  nextTick(() => {
    let input = document.querySelectorAll('.radio-input');
    input[input.length - 1].focus();
  });
};

const emit = defineEmits(['focusItem', 'copyListFn', 'deleteListFn', 'addListFn', 'questionsLen']);
</script>

<template>
  <div class="q-wrap">
    <draggable
      v-model="questions"
      group="people"
      item-key="question_id"
      :move="onMove"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element, index }">
        <div
          class="q-li"
          :class="{ 'q-li-focus': focusIndex === index }"
          @click="emit('focusItem', $event, index)"
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
            v-for="(content, index1) in element.content"
            v-show="content.language === props.langCode[props.langList.indexOf(props.activeTab)]"
          >
            <QuestionTitle
              :content="content"
              :element="element"
              :index="index"
              :focusIndex="focusIndex"
              @updateType="element.types = $event"
            />
            <QuestionOptions
              v-if="['下拉列表', '單選題', '多選題'].includes(element.types)"
              :element="element"
              :content="content"
              :index="index"
              :index1="index1"
              :focusIndex="focusIndex"
              :addRadio="addRadio"
              @deleteRadioFn="handleDeleteRadioFn"
              @addRadioFn="handleAddRadioFn"
            />
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
</style>
