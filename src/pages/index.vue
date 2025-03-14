<script setup>
import Draggable from 'vuedraggable';
import DragOutline from '@/assets/img/drag.png';
import { NIcon, NSwitch, NCheckbox, NTabs, NModal, useMessage, NButton, NTabPane, NSelect } from "naive-ui";
import { TrashOutline, CopyOutline, Add, CloseSharp } from "@vicons/ionicons5";
const message = useMessage();
const focusIndex = ref(0)

const drag = ref(false) // 定義 drag 變數
const defaultLang = ref('英文')
const tabLang = ref('中文');
const editableTabs = ref(['中文']);
const addRadio = ref('添加選項')
const addLangVisible = ref(false);
const langCode = ['cn', 'en', 'kr', 'jp', 'fr', 'de', 'ru', 'sp', 'po', 'it', 'nl', 'id', 'tr', 'thai', 'zh', 'fa', 'ro', 'ar']
const langList = ['中文', '英語', '韓語', '日語', '法語', '德語', '俄語', '西班牙語', '葡萄牙語', '義大利語', '荷蘭語', '印度語', '土耳其語', '泰語', '繁體中文', '波斯語', '羅馬尼亞語', '阿拉伯語']
const lineOptions = [
  {
    label: "0",
    value: "0"
  },
  {
    label: "1",
    value: "1"
  }
]

const lineEndOptions = [

  ...Array.from({ length: 8 }, (_, i) => ({
    label: (i + 2).toString(),
    value: (i + 2).toString()
  }))
];

const selectOptions = [
  {
    label: "單選題",
    value: "單選題",
  }, {
    label: "多選題",
    value: "多選題",
  }, {
    label: "下拉列表",
    value: "下拉列表",
  }, {
    label: "線性量表",
    value: "線性量表",
  }, {
    label: "文本題",
    value: "文本題",
  }
]
const options = [
  {
    label: "中文",
    value: "中文",
  },
  {
    label: "英語",
    value: "英文"
  },
];

const addRadioFn = (i, j) => {
  let list = data.question[i].content[j].answer
  addFormFn(list)
}

const addFormFn = (list) => {
  // let index = list.length ? parseInt(list[list.length - 1].description.substr(2)) + 1 : '1'
  // let text = index ? '選項' + index : '選項1'
  list.push({ answer_id: list.length + 1, description: null })
  nextTick(() => {
    let input = document.querySelectorAll('.radio-input')
    input[input.length - 1].focus()
  })
}

const deleteRadioFn = (i, j, k) => {
  data.question[i].content[j].answer.splice(k, 1)
}

const focusTitle = (event) => {
  let classList = event.target.classList
  if (classList.contains('add-list') || classList.contains('el-icon-plus')) return
  focusIndex.value = 'title'
}

const focusItem = (event, i) => {
  let classList = event.target.classList
  if (classList.contains('el-icon-delete') || classList.contains('icon-copy') || focusIndex.value === i) return
  focusIndex.value = i
}

const copyListFn = (index) => {
  let dataCopy = JSON.parse(JSON.stringify(data.question[index]))
  data.question.splice(index, 0, dataCopy)
  focusIndex.value = data.question.length - 1;
  nextTick(index);
}
const addListFn = (index) => {
  let codeList = editableTabs.value.map((i) => {
    return langCode[langList.indexOf(i)]
  })
  let contentList = codeList.map((i) => {
    return {
      language: i,
      title: '',
      answer: [{
        answer_id: 1,
        description: null
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
  let list = {
    question_id: data.question.length + 1,
    types: '單選題',
    is_required: false,
    content: contentList
  }

  data.question.splice(index + 1, 0, list)
  focusIndex.value = index + 1
  nextTick(index);
  // data.question.push(list)
  // console.log(data.question)
  // focusIndex.value = data.question.length - 1
}

const deleteListFn = (i) => {
  data.question.splice(i, 1)
  focusIndex.value = i === 0 && data.question.length > 0 ? i : i - 1
}

const onMove = ({ relatedContext, draggedContext }) => {
  let relatedIndex = relatedContext.index
  let index = draggedContext.index
  relatedContext.element.question_id = index + 1
  draggedContext.element.question_id = relatedIndex + 1
}

const data = reactive({
  display_name: '',
  name: [{
    questionnaire_name: '',
    desc: '',
    language: 'cn'
  }],
  repeat_submit: false,
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
          description: null
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



// 計算屬性，決定是否可以添加
const addable = computed(() => true
  // panels.value.length < 10
);

// 計算屬性，決定是否可以關閉
const closable = computed(() => editableTabs.value.length > 1);



// 處理添加新 Tab
const handleAdd = () => {
  addLangVisible.value = true
  // const newValue = Math.max(...panels.value) + 1;
  // panels.value.push(newValue);
  // value.value = newValue;
};

// 處理關閉 Tab
const handleClose = (name) => {
  const nameIndex = editableTabs.value.findIndex(panelName => panelName === name);
  if (nameIndex === -1) return;

  editableTabs.value.splice(nameIndex, 1);
  if (name === tabLang.value) {
    tabLang.value = editableTabs.value[Math.min(nameIndex, editableTabs.value.length - 1)];
  }
};

const bodyStyle = {
  width: "600px"
};
const segmented = {
  content: "soft",
  footer: "soft"
};

const addLangFn = () => {

  let value = defaultLang.value
  if (editableTabs.value.indexOf(value) > -1) {
    message.warning('語言：' + value + '已經添加過了，請檢查一下哦！')
  } else {
    editableTabs.value.push(value)
    tabLang.value = value
    addLangDataFn(value)
  }
  addLangVisible.value = false
}

const addLangDataFn = (value) => {
  let code = langCode[langList.indexOf(value)]
  data.question.map((i) => {
    let li = {
      language: code,
      title: '',
      answer: [{
        answer_id: 1,
        description: null
      }],
      line_answer: {
        line_value: 1,
        line_end_value: 5,
        line_tag: '',
        line_end_tag: ''
      },
      text_answer: ''
    }
    i.content.push(li)
    return i
  })
  data.name.push({
    questionnaire_name: '',
    desc: '',
    language: code
  })
}

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

</script>

<template>
  <div class="form-create-wrap">
    <div class="wrap">
      <div class="content-wrap">
        <div
          class="item title"
          @click="focusTitle($event)"
          :class="{ 'title-focus': focusIndex === 'title' }"
        >
          <n-tabs
            animated
            v-model:value="tabLang"
            type="card"
            :addable="addable"
            :closable="closable"
            tab-style="min-width: 80px;"
            @close="handleClose"
            @add="handleAdd"
          >
            <n-tab-pane
              v-for="panel in editableTabs"
              :key="panel"
              :name="panel"
            >
            </n-tab-pane>
          </n-tabs>
          <div
            class="li"
            v-for="i in data.name"
            v-show="i.language === langCode[langList.indexOf(tabLang)]"
          >
            <textarea
              class="title-area"
              placeholder="問卷標題"
              v-model="i.questionnaire_name"
            ></textarea>
          </div>

          <div
            class="li"
            v-for="i in data.name"
            v-show="i.language === langCode[langList.indexOf(tabLang)]"
          >
            <textarea
              placeholder="問卷說明"
              v-model="i.desc"
            ></textarea>
          </div>
          <div
            class="add-list"
            @click="addListFn(0)"
            v-show="!data.question.length"
          >
            <n-icon
              class="el-icon-plus"
              size="20"
            >
              <Add />
            </n-icon>
          </div>
        </div>
        <div class="q-wrap">
          <draggable
            item-key="id"
            v-model="data.question"
            group="people"
            :move="onMove"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element, index }">
              <div
                class="q-li"
                :class="{ 'q-li-focus': focusIndex === index }"
                id="items"
                @click="focusItem($event, index)"
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
                  v-show="content.language === langCode[langList.indexOf(tabLang)]"
                >
                  <div class="q-item q-title-wrap">
                    <div class="q-title">
                      <div class="li">
                        <textarea
                          class="q-area"
                          placeholder="問題"
                          v-model="content.title"
                        ></textarea>
                      </div>
                    </div>
                    <n-select
                      class="q-select"
                      v-show="focusIndex === index"
                      v-model:value="element.types"
                      filterable
                      placeholder="請選擇問題類型"
                      :options="selectOptions"
                    ></n-select>
                  </div>
                  <div
                    class="q-item"
                    v-show="element.types === '下拉列表' || element.types === '單選題' || element.types === '多選題'"
                  >
                    <div
                      class="q-radio"
                      v-for="(item, i) in content.answer"
                    >
                      <div
                        class="icon-radio"
                        v-show="element.types === '下拉列表'"
                      >{{ i + 1 }}.</div>
                      <div
                        v-show="element.types === '單選題' || element.types === '多選題'"
                        class="icon-radio"
                        :class="{ 'icon-cirle': element.types === '單選題', 'icon-square': element.types === '多選題' }"
                      ></div>
                      <input
                        class="radio-input"
                        v-model="item.description"
                        :placeholder="`選項${i + 1}`"
                      />
                      <n-icon
                        size="40"
                        @click="deleteRadioFn(index, index1, i)"
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
                      >{{ content.answer.length + 1 }}.</div>
                      <div
                        v-else
                        class="icon-radio"
                        :class="{ 'icon-cirle': element.types === '單選題', 'icon-square': element.types === '多選題' }"
                      ></div>
                      <button
                        style="flex:0.2; background-color:transparent;border:none;  font-size: 16px;text-align:left"
                        class="radio-add"
                        @click="addRadioFn(index, index1)"
                      >
                        {{ addRadio }}
                      </button>

                    </div>
                  </div>
                  <div
                    class="q-item line-wrap"
                    v-show="element.types === '線性量表'"
                  >
                    <div class="q-item-line">
                      <n-select
                        v-model:value="content.line_answer.line_value"
                        :options="lineOptions"
                      ></n-select>
                      <span class="line-tip">到</span>
                      <n-select
                        v-model:value="content.line_answer.line_end_value"
                        :options="lineEndOptions"
                      ></n-select>
                    </div>
                    <div class="q-radio">
                      <div class="icon-radio">1.</div>
                      <input
                        class="radio-input"
                        v-model="content.line_answer.line_tag"
                        placeholder="標籤（選填）"
                      />
                    </div>
                    <div class="q-radio">
                      <div class="icon-radio">2.</div>
                      <input
                        class="radio-input"
                        v-model="content.line_answer.line_end_tag"
                        placeholder="標籤（選填）"
                      />
                    </div>
                  </div>
                  <div
                    class="q-item text-wrap"
                    v-show="element.types === '文本題'"
                  >文本回答</div>
                </div>
                <div
                  class="q-item option-wrap"
                  v-if="focusIndex === index"
                >
                  <ul class="option-list">
                    <li>
                      <n-icon
                        size="20"
                        class="iconfont icon-copy"
                        @click="copyListFn(index)"
                      >
                        <CopyOutline />
                      </n-icon>
                    </li>
                    <li>
                      <n-icon
                        size="20"
                        class="el-icon-delete"
                        @click="deleteListFn(index)"
                      >
                        <TrashOutline />
                      </n-icon>

                    </li>
                    <li>
                      <n-icon
                        @click="addListFn(index)"
                        class="el-icon-plus"
                        size="20"
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
              </div>
            </template>

          </draggable>
        </div>
      </div>
    </div>
    <n-modal
      v-model:show="addLangVisible"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      title="添加語言"
      :bordered="false"
      size="huge"
      :segmented="segmented"
    >
      <div class="li-item">
        <span class="label">選擇語言</span>
        <n-select
          class="q-select"
          v-model:value="defaultLang"
          filterable
          placeholder="請選擇語言"
          :options="options"
        ></n-select>
      </div>
      <div class="dialog-footer">
        <n-button
          type="error"
          @click="addLangVisible = false"
          style="margin-right: 1rem;"
        >
          取消
        </n-button>
        <n-button
          type="success"
          @click="addLangFn"
        >
          確定
        </n-button>
      </div>

    </n-modal>
  </div>
</template>
<style scoped>
input,
textarea {
  all: unset;
}

.dialog-footer {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.form-create-wrap {
  --green: #4ca2ae;
  --grey: rgba(0, 0, 0, .5);
  position: relative;
  width: 80%;
  min-width: 400px;
  margin: 30px auto;
}

.form-create-wrap .wrap {
  width: 780px;
  min-height: 100px;
  margin: 0 auto;
  display: flex;
}

.form-create-wrap .wrap .content-wrap {
  flex: 1;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .1);

}

.form-create-wrap .wrap .form-sidebar {
  flex: 1;
  flex-grow: 0;
  align-self: flex-end;
  display: inline-block;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .24);
}

.form-create-wrap .wrap .form-sidebar .sidebar-li {
  cursor: pointer;
  padding: 10px 12px;
}

.form-create-wrap .item {
  padding: 16px 24px 24px 42px;
}

.form-create-wrap .item .li-right {
  text-align: right;
}

.form-create-wrap .item .li-left {
  text-align: left;
}

.form-create-wrap .item .li-left .q-select {
  display: inline-block;
  width: 120px;
}

.form-create-wrap .title-focus {
  border-left-color: var(--green) !important;
}

.form-create-wrap .title {
  border-left: 3px solid transparent;
  position: relative;
}

.form-create-wrap .add-list {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e9e9e9;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.form-create-wrap .title .add-list .n-icon {
  color: var(--green);
  font-size: 22px;
}

.form-create-wrap .q-wrap .q-li-focus {
  border-left-color: var(--green) !important;
  box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 6px 0 rgba(0, 0, 0, 0.24);
  border: 1px transparent solid;
}

.form-create-wrap .q-wrap .q-li {
  border-left: 3px solid transparent;
}

.form-create-wrap .q-wrap .q-title-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 25px !important;
}

.form-create-wrap .q-wrap .q-title-wrap .q-index {
  flex: 1;
  flex-grow: 0;
  margin-right: 10px;
}

.form-create-wrap .q-wrap .q-title-wrap .q-title {
  flex: 1;
  flex-grow: 2;
}

.form-create-wrap .q-wrap .q-title-wrap .q-select {
  flex: 1;
  flex-shrink: 0;
}

.form-create-wrap .q-wrap .drap-area {
  padding: 5px;
  cursor: move;
}

.form-create-wrap .q-wrap .drap-area .icon-tuozhuai {
  color: lightgray;
  font-size: 20px;
  margin-left: 37px;
}

.form-create-wrap .q-wrap .q-item-wrap {
  padding: 16px 24px 24px 42px;
}

.form-create-wrap .q-wrap .q-item {
  margin-bottom: 10px;
}

.form-create-wrap .q-wrap .q-radio {
  margin: 15px auto;
  display: flex;
  align-items: center;
}

.form-create-wrap .q-wrap .q-radio .icon-radio {
  width: 15px;
  height: 15px;
  border: 2px solid transparent;
  margin-right: 15px;
}

.form-create-wrap .q-wrap .q-radio .icon-cirle {
  border: 2px solid lightgray;
  border-radius: 50%;
}

.form-create-wrap .q-wrap .q-radio .icon-square {
  border: 2px solid lightgray;
  border-radius: 0;
}

.form-create-wrap .q-wrap .q-radio input,
.form-create-wrap .q-wrap .q-radio button {
  flex: 2;
  margin-right: 15px;
  /* border: 1px solid transparent;*/
}

.form-create-wrap .q-wrap .q-radio input:focus {
  border-bottom: 1px solid lightgray;
}

.form-create-wrap .q-wrap .q-radio button:focus {
  border-bottom: 1px solid lightgray;
}

.form-create-wrap .q-wrap .q-radio .n-icon {
  flex: 1;
  flex-grow: 0;
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.form-create-wrap .q-wrap .q-radio .radio-add {
  color: var(--green);
  font-weight: bold;
  cursor: pointer;
  flex: 0;
}

.form-create-wrap .q-wrap .line-wrap .q-item-line {
  display: flex;
  align-items: center;
}

.form-create-wrap .q-wrap .line-wrap .q-item-line .el-select {
  width: 70px;
}

.form-create-wrap .q-wrap .line-wrap .q-item-line .el-input {
  border: none !important;
}

.form-create-wrap .q-wrap .line-wrap .line-tip {
  padding: 15px;
}

.form-create-wrap .q-wrap .q-radio input {
  border-bottom: 1px solid lightgray !important;
}

.form-create-wrap .q-wrap .q-radio button {
  border-bottom: 1px solid lightgray !important;
}

.form-create-wrap .q-wrap .text-wrap {
  color: var(--grey);
  border-bottom: 1px dotted lightgray;
  padding-bottom: 5px;
  width: 60%;
  text-align: left;
}

.form-create-wrap .q-wrap .square-wrap {
  display: flex;
}

.form-create-wrap .q-wrap .square-wrap .square-li {
  flex: 1;
}

.form-create-wrap .q-wrap .option-wrap {
  overflow: hidden;
  border-top: 1px solid lightgray;

}

.form-create-wrap .q-wrap .option-wrap .option-list {

  float: right;
}

.form-create-wrap .q-wrap .option-wrap .option-list li {
  display: flex;
  justify-items: center;
  align-items: center;
  float: left;
  list-style: none;
  margin: 20px 10px 20px 25px;
}

.form-create-wrap .q-wrap .option-wrap .option-list .icon-copy {
  font-size: 20px;
}

.form-create-wrap .q-wrap .option-wrap .option-list .el-icon-delete {
  font-size: 21px;
  vertical-align: middle;
}

.form-create-wrap .q-wrap .option-wrap .option-list i {
  cursor: pointer;
}

.form-create-wrap .q-wrap .option-wrap .lang-li {
  margin: 15px 8px;
  display: flex;
  align-items: center;
}

.form-create-wrap .q-wrap .option-wrap .option-list .lang-li span {
  margin-left: 10px;
  cursor: pointer;
  color: var(--green);
  font-weight: bold;
}

.form-create-wrap .q-wrap .option-wrap .option-list .el-select {
  width: 120px;
}

.form-create-wrap .q-wrap .lang-wrap {
  border-top: 1px dotted lightgray;
  padding-top: 20px;
}

.form-create-wrap .q-wrap .lang-wrap .lang-li-wrap {
  display: flex;
}

.form-create-wrap .q-wrap .lang-wrap .lang-li-wrap .li-text {
  margin-right: 15px;
}

.form-create-wrap .q-wrap .lang-wrap .lang-li-wrap .li-text i {
  display: block;
  margin-top: 20px;
  cursor: pointer;
}

.form-create-wrap .q-wrap .lang-wrap .lang-li-wrap .el-icon-delete {
  font-size: 21px;
}

.form-create-wrap .li {
  position: relative;
  margin-bottom: 15px;

}

.form-create-wrap .li:after {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: -1px;
  left: 0;
  transform: scaleX(0);
  background-color: var(--green);
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0s;
}

.form-create-wrap .li:hover:after {
  border-bottom: 1px solid transparent;
  transform: scaleX(1);
}

.form-create-wrap .li .form-title {
  font-size: 24px;
}


.form-create-wrap .li .form-title::-webkit-input-placeholder {
  font-size: 24px;
}

.form-create-wrap .li .title-area {
  font-size: 20px;
  all: unset;
}

.form-create-wrap .li .title-area::-webkit-input-placeholder {
  font-size: 20px;
}

.form-create-wrap .li .q-area {
  font-size: 18px;
}

.form-create-wrap .li .q-area::-webkit-input-placeholder {
  font-size: 18px;
}

.form-create-wrap textarea {
  background-color: transparent;
  border: none;
  resize: none;
  display: block;
  width: 100%;
  height: 35px;
}

.form-create-wrap .expand-area {
  position: relative;
}

.form-create-wrap .expand-area textarea {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
}

.form-create-wrap .expand-area pre {
  display: block;
  visibility: hidden;
  min-height: 100px;
  margin: 0;
}

.form-create-wrap .add-lang .li-item {
  display: flex;
  align-items: center;
}

.form-create-wrap .add-lang .li-item .label {
  margin-right: 15px;
}

.form-create-wrap input::-webkit-input-placeholder,
.form-create-wrap textarea::-webkit-input-placeholder {
  color: var(--grey);
}

@media (min-width: 520px) {
  .form-create-wrap {
    width: 98%;
  }
}

@media (max-width: 920px) {
  .form-create-wrap .wrap {
    width: 98%;
  }
}
</style>