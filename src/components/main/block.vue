<script setup>
import { MdMore } from "@vicons/ionicons4";
import { NIcon, NDropdown } from "naive-ui";
import { storeToRefs } from "pinia";
import { useLangStore } from "@/stores/lang.js";
import { useFormDataStore } from "@/stores/formData.js";
import { useFormStyleStore } from "@/stores/formStyle.js";
import { useBlockStore } from "@/stores/block.js";
const blockStore = useBlockStore();
const { moveBlock, addBlock, copyBlock, deleteBlock, mergeBlock } = blockStore;
const formDataStore = useFormDataStore();
const formStyleStore = useFormStyleStore();
const { focusIndex } = storeToRefs(formStyleStore);
const { focusTitle, focusBlockTitle, focusItem } = formStyleStore;

const { data } = storeToRefs(formDataStore)
const LangStore = useLangStore();
const { activeTab } = storeToRefs(LangStore)
const { getCodeByCn } = LangStore;

const getOptions = (order) => {
  return [
    {
      label: "新增區段",
      key: "add"
    },
    {
      label: "複製區段",
      key: "copy"
    },
    order !== 1 && {
      label: "移動區段",
      key: "move"
    },
    order !== 1 && {
      label: "刪除區段",
      key: "delete"
    },
    order !== 1 && {
      label: "與上一個區段合併",
      key: "merge"
    }
  ].filter(Boolean); // 過濾掉 false 或 null 的值，讓選單不顯示
};

const handleSelect = (key, index) => {
  const lang = getCodeByCn(activeTab.value)
  if (key == 'add') {
    addBlock(lang, index);
  } else if (key == 'copy') {
    copyBlock(lang, index);
  } else if (key == 'delete') {
    deleteBlock(lang, index);
  } else if (key == 'merge') {
    mergeBlock(lang, index);
  } else if (key == 'move') {

  }
  console.log("選擇:", key, index);
};
// console.log(data.value.content[getCodeByCn(activeTab.value)].block[0].blockTitle)

</script>

<template>
  <section
    v-for="(blockItem, index) in data.content[getCodeByCn(activeTab)].block"
    :key="blockItem.block_id"
  >
    <div
      class="item title"
      @click="focusBlockTitle($event)"
      :class="{ 'title-focus': focusIndex === -2 }"
    >
      <div>
        <!-- 區塊標題 -->
        <section style="display: flex;">
          <div class="li">
            <textarea
              style="font-size: 1.2rem;"
              class="title-area"
              placeholder="區塊標題"
              v-model="blockItem.blockTitle.questionnaire_blockTitle"
            ></textarea>

          </div>
          <n-dropdown
            :options="getOptions(blockItem.order)"
            trigger="click"
            @select="(key) => handleSelect(key, index)"
          >
            <n-icon
              size="25"
              class="more-icon"
            >
              <MdMore />
            </n-icon>
          </n-dropdown>
        </section>
      </div>

      <!-- 區塊說明 -->
      <!-- <div class="li">
      <textarea
        placeholder="區塊說明"
        v-model="blockItem.desc"
      ></textarea>
    </div> -->
    </div>
  </section>
</template>

<style scoped>
.more-icon {
  border-radius: 50%;
  margin: 1rem;
}

.more-icon:hover {
  background-color: rgb(238, 237, 237);
}

.more-icon:active {
  background-color: rgb(215, 215, 215);
}

.form-title {
  margin-bottom: 2rem;
}

.item {
  width: 100%;
  padding: 16px 24px 24px 42px;
}

.item.title {
  border-left: 3px solid transparent;
  position: relative;
}

.title-focus {
  border-left-color: var(--green) !important;
}

.form-create-wrap {
  --green: #4ca2ae;
  --grey: rgba(0, 0, 0, .5);
  position: relative;
  width: 80%;

  margin: 2rem auto;
}

.form-create-wrap .li {
  position: relative;
  margin-bottom: 0.5rem;
  width: 100%;
  /* 確保有足夠的寬度讓伪元素顯示 */
}

.form-create-wrap .li:after {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: 1rem;
  left: 0;
  transform: scaleX(0);
  background-color: var(--green);
  /* 確保這個變數正確定義 */
  transition: transform 0.3s ease, background-color 0.3s ease;
  /* 確保 transition 正確 */
}

.form-create-wrap .li:hover:after {
  transform: scaleX(1);
  /* 在 hover 時顯示 */
  background-color: var(--green);
  /* 確保背景顏色在 hover 時有變化 */
}

.form-create-wrap .li .title-area {
  font-size: 1.2rem;
  all: unset;
}

.form-create-wrap .li .title-area::-webkit-input-placeholder {
  font-size: 1.2rem;
}

.form-create-wrap input::-webkit-input-placeholder,
.form-create-wrap textarea::-webkit-input-placeholder {
  color: rgba(0, 0, 0, .5);
}
</style>
