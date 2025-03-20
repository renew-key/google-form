<script setup>
import DragOutline from '@/assets/img/drag.png';
const props = defineProps({
  element: Object,
  index: Number,
  focusIndex: Number,
  langCode: Array,
  langList: Array,
  tabLang: String,
  selectOptions: Array,
  lineOptions: Array,
  lineEndOptions: Array,
  addRadio: String
});

const emit = defineEmits(['focusItem', 'deleteRadioFn', 'addRadioFn', 'copyListFn', 'deleteListFn', 'addListFn']);
</script>

<template>
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
      v-show="content.language === langCode[langList.indexOf(tabLang)]"
    >
      <div class="q-item q-title-wrap">
        <textarea
          class="q-area"
          placeholder="問題"
          v-model="content.title"
        ></textarea>
        <n-select
          class="q-select"
          v-show="focusIndex === index"
          v-model:value="element.types"
          filterable
          placeholder="請選擇問題類型"
          :options="selectOptions"
        />
      </div>

      <QuestionOptions
        v-if="['下拉列表', '單選題', '多選題'].includes(element.types)"
        :element="element"
        :content="content"
        :index="index"
        :index1="index1"
        :focusIndex="focusIndex"
        :addRadio="addRadio"
        @deleteRadioFn="emit('deleteRadioFn', $event)"
        @addRadioFn="emit('addRadioFn', $event)"
      />

      <QuestionLinearScale
        v-if="element.types === '線性量表'"
        :content="content"
        :lineOptions="lineOptions"
        :lineEndOptions="lineEndOptions"
      />

      <QuestionText v-if="element.types === '文本題'" />
    </div>

    <QuestionActions
      v-if="focusIndex === index"
      :element="element"
      :index="index"
      @copyListFn="emit('copyListFn', index)"
      @deleteListFn="emit('deleteListFn', index)"
      @addListFn="emit('addListFn', index)"
    />
  </div>
</template>
