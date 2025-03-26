<script setup>
import { MdMore } from "@vicons/ionicons4";
import { NIcon, NDropdown, NSelect } from "naive-ui";
import { storeToRefs } from "pinia";
import { useLangStore } from "@/stores/lang.js";
import { useFormDataStore } from "@/stores/formData.js";
import { useFormStyleStore } from "@/stores/formStyle.js";
import { useBlockStore } from "@/stores/block.js";
const blockStore = useBlockStore();
const { moveBlock, addBlock, copyBlock, deleteBlock, mergeBlock } = blockStore;
const { blockLen } = storeToRefs(blockStore)
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
    {
      label: "移動區段",
      key: "move"
    },
    {
      label: "刪除區段",
      key: "delete"
    },
    order !== 1 && {
      label: "與上一個區段合併",
      key: "merge"
    }
  ].filter(Boolean); // 過濾掉 false 或 null 的值，讓選單不顯示
};

const blockOptions = (index) => {
  const blocks = data.value.content[getCodeByCn(activeTab.value)].block;
  const currentBlockOrder = index + 1; // 獲取當前選擇的區段順序
  // console.log(currentBlockOrder)
  return [
    { label: "前往下個區段", value: "next" },
    ...blocks
      .filter((block) => block.order !== currentBlockOrder) // 排除當前區段
      .map((block) => ({
        label: `前往區段 ${block.order} (${block.blockTitle.questionnaire_blockTitle || "無標題"})`,
        value: `block_${block.order}`,
      })),
    { label: "提交表單", value: "send" },
  ];
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
  // console.log("選擇:", key, index);
};

// // 使用 watchEffect 監聽語言的切換與內容更新
watchEffect(() => {
  const blocks = data.value.content[getCodeByCn(activeTab.value)].block;

  blocks.forEach((block, index) => {
    // 如果是最後一個區段，將 nextStep 設為 'send'
    if (index === blocks.length - 1) {
      block.nextStep = 'send';
    } else {
      // 如果不是最後一個區段，且 nextStep 還沒有是 'send'，則設為 'next'
      if (block.nextStep == 'send') {
        block.nextStep = 'next';
      }
    }

    // 控制是否顯示選擇框，只有在最後一個區塊才顯示
    block.isShowBlockChoose = index === blocks.length - 1 ? false : true;
  });
});




</script>

<template>
  <div
    class="form-create-wrap"
    v-for="(blockItem, index) in data.content[getCodeByCn(activeTab)].block"
    :key="blockItem.block_id"
  >
    <div class="wrap">
      <div
        class="item title"
        @click="focusBlockTitle($event, `block_${index}`)"
        :class="{ 'title-focus': focusIndex === `block_${index}` }"
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

    </div>

    <p
      class="footer"
      v-if="blockItem.isShowBlockChoose"
    >
    <section class="text">於區段{{ index + 1 }}後 </section> <n-select
      :bordered="false"
      class="block-choose-width"
      v-model:value="blockItem.nextStep"
      :options="blockOptions(index)"
    /></p>
  </div>
</template>

<style scoped>
.footer {
  width: 780px;
  margin: 0 auto;
  margin-top: 1rem;
  font-size: 1rem;
  display: flex;
  background-color: transparent;
  align-items: center;
  justify-content: left;
}

.text {
  display: flex;
  justify-content: left;

}

.block-choose-width {
  max-width: 200px;
  display: flex;
  justify-content: left;
  border: none !important;
}

.n-select {
  border: none !important;
}

.form-create-wrap {
  --green: #4ca2ae;
  --grey: rgba(0, 0, 0, .5);
  position: relative;
  width: 80%;

  margin: 2rem auto;
}

.wrap {
  width: 780px;
  min-height: 100px;
  margin: 0 auto;
  display: flex;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .1);
  /*padding: 2rem 4rem;*/
  flex-direction: column;
}

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

@media (max-width: 920px) {
  .form-create-wrap {
    width: 100%;
    padding-right: 0.2rem;
    margin: 0;
    margin-top: 0.5rem;
  }

  .form-create-wrap .wrap {
    width: 100%;
  }

  .footer {
    width: 95%;
    display: flex;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    background-color: transparent;
  }



}
</style>
