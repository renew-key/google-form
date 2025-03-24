<script setup>
import { ref, reactive, nextTick } from 'vue';
import draggable from 'vuedraggable';
import DragOutline from '@/assets/img/drag.png';
import { NIcon, useMessage } from 'naive-ui';

const addRadio = ref('添加選項');
const addOther = ref('其他')
const props = defineProps({
  tabs: Array,
  langCode: Array,
  langList: Array,
  activeTab: String,
  focusIndex: [String, Number],
});


const data = reactive({
  question: [{
    question_id: 1,
    types: '單選題',
    is_required: false,
    content: [
      {
        language: 'cn',
        title: '',
        answer: [{
          answer_id: 1,
          description: null,
          isOther: false
        }],
        line_answer: {
          line_value: 1,
          line_end_value: 5,
          line_tag: '',
          line_end_tag: ''
        },
        text_answer: ''
      }
    ]
  }]
})
watch(() => props.activeTab, (newTab) => {
  // console.log(newTab)
  // 重設 data.question 只保留一個初始的問題
  data.question = [{
    question_id: 1,
    types: '單選題',
    is_required: false,
    content: [
      {
        language: newTab,
        title: '',
        answer: [{
          answer_id: 1,
          description: null,
          isOther: false
        }],
        line_answer: {
          line_value: 1,
          line_end_value: 5,
          line_tag: '',
          line_end_tag: ''
        },
        text_answer: ''
      }
    ]
  }];

  // console.log(data)
});




const handleDeleteRadioFn = (i, j, k) => {
  data.question[i].content[j].answer.splice(k, 1);
};

const handleAddRadioFn = (i, j) => {
  let list = data.question[i].content[j].answer;
  addFormFn(list);
};

const handleAddOtherFn = (i, j) => {
  let list = data.question[i].content[j].answer;
  addOtherFn(list);
}

const addFormFn = (list) => {
  // 檢查是否已經有 "其他" 選項
  const otherIndex = list.findIndex(item => item.isOther);

  if (otherIndex !== -1) {
    // 先移除 "其他" 選項，避免 `list = list.filter(...)` 破壞響應式
    const otherItem = list[otherIndex];
    list.splice(otherIndex, 1);

    // 新增一般選項
    list.push({ answer_id: list.length + 1, description: null, isOther: false });

    // 把 "其他" 選項加回來，確保它在最後
    list.push(otherItem);
  } else {
    // 沒有 "其他" 選項時，直接新增
    list.push({ answer_id: list.length + 1, description: null, isOther: false });
  }

  nextTick(() => {
    let input = document.querySelectorAll('.radio-input');
    if (input.length > 0) {
      input[input.length - 1].focus();
    }
  });
};

const addOtherFn = (list) => {
  // 確保 "其他" 只會新增一次
  const hasOther = list.some(item => item.isOther);

  if (!hasOther) {
    list.push({
      answer_id: list.length + 1,
      description: "其他...",
      isOther: true
    });
  }

  nextTick(() => {
    let input = document.querySelectorAll('.radio-input');
    if (input.length > 0) {
      input[input.length - 1].focus();
    }
  });
};


const handleCopyList = (index) => {
  // console.log("Copy")
  let dataCopy = JSON.parse(JSON.stringify(data.question[index]))
  data.question.splice(index, 0, dataCopy)
  // emit('focusItem', event, questions.length - 1)
  nextTick(index);
}

const handleDeleteList = (i) => {
  // console.log("Delete")
  data.question.splice(i, 1)
  emit('questionsLen', i)
  // emit('focusItem', event, i === 0 && questions.length > 0 ? i : i - 1)
}

const handleAddList = (index) => {
  // console.log("add")
  // console.log(props.tabs)
  let codeList = props.tabs.map((i) => {
    return props.langCode[props.langList.indexOf(i)]
  })

  let contentList = codeList.map((i) => {
    return {
      language: i,
      title: '',
      answer: [{
        answer_id: 1,
        description: null,
        isOther: false
      }],
      line_answer: {
        line_value: 1,
        line_end_value: 5,
        line_tag: '',
        line_end_tag: ''
      },
      text_answer: ''
    }
  })
  // console.log(contentList)
  let list = {
    question_id: data.question.length + 1,
    types: '單選題',
    is_required: false,
    content: contentList
  }

  data.question.splice(index + 1, 0, list);

  // emit('focusItem', event, index + 1)
  // nextTick(index);

}

const emit = defineEmits(['focusItem', 'questionsLen']);

nextTick((index) => {
  // 滾動到新增的項目
  const newQuestionElement = document.getElementById(`q-li-${index + 1}`);
  if (newQuestionElement) {
    newQuestionElement.scrollIntoView({
      behavior: 'smooth', // 平滑滾動
      block: 'center', // 將新項目置中顯示
    });
  }
});

defineExpose({
  handleAddList
});

</script>

<template>
  <div class="q-wrap">
    <draggable
      v-model="data.question"
      group="people"
      item-key="question_id"
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
              :addOther="addOther"
              @deleteRadioFn="handleDeleteRadioFn"
              @addRadioFn="handleAddRadioFn"
              @addOtherFn="handleAddOtherFn"
            />
            <QuestionText v-if="element.types === '文本題'" />
            <QuestionLinearScale
              v-if="element.types === '線性量表'"
              :content="content"
            />
            <QuestionActions
              v-if="focusIndex === index"
              :element="element"
              :index="index"
              @copyListFn="handleCopyList"
              @deleteListFn="handleDeleteList"
              @addListFn="handleAddList"
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
