<script setup>
import draggable from 'vuedraggable';
const props = defineProps({
  tabs: Array,
  langCode: Array,
  langList: langList,
  activeTab: String,
  focusIndex: String
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
        <QuestionItem
          :element="element"
          :index="index"
          :focusIndex="props.focusIndex"
          :langCode="langCode"
          :langList="langList"
          :tabLang="props.tabLang"
          :selectOptions="selectOptions"
          :lineOptions="lineOptions"
          :lineEndOptions="lineEndOptions"
          :addRadio="addRadio"
          @focusItem="focusIndex = $event"
          @deleteRadioFn="deleteRadioFn"
          @addRadioFn="addRadioFn"
          @copyListFn="copyListFn"
          @deleteListFn="deleteListFn"
          @addListFn="addListFn"
        />
      </template>

    </draggable>
  </div>
</template>
<style></style>