<script setup>
import { MdMore } from "@vicons/ionicons4";
import { NIcon, NDropdown, NSelect, NModal, NCard } from "naive-ui";
import { storeToRefs } from "pinia";
import { useLangStore } from "@/stores/lang.js";
import { useFormDataStore } from "@/stores/formData.js";
import { useFormStyleStore } from "@/stores/formStyle.js";
import { useBlockStore } from "@/stores/block.js";
const blockStore = useBlockStore();
const { addBlock, copyBlock, deleteBlock, mergeBlock, blockOptions } = blockStore;
const formDataStore = useFormDataStore();
const formStyleStore = useFormStyleStore();
const { focusIndex } = storeToRefs(formStyleStore);
const { focusBlockTitle, focusItem } = formStyleStore;

const { data } = storeToRefs(formDataStore)
const LangStore = useLangStore();
const { activeTab } = storeToRefs(LangStore)
const { getCodeByCn } = LangStore;
const showModalMove = ref(false);
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
    showModalMove.value = true
  }
  // console.log("選擇:", key, index);
};

// // 使用 watchEffect 監聽語言的切換與內容更新
watchEffect(() => {
  const blocks = data.value.content[getCodeByCn(activeTab.value)].block;

  blocks.forEach((block, index) => {
    // 控制是否顯示選擇框，只有在最後一個區塊才顯示
    block.isShowBlockChoose = index === blocks.length - 1 ? false : true;
  });
});

const handleCloseShow = (res) => {
  showModalMove.value = res
}


</script>

<template>
  <n-modal v-model:show="showModalMove">
    <blockMove @closeShow="handleCloseShow" />
  </n-modal>
  <div
    class="form-create-wrap"
    v-for="(blockItem, index) in data.content[getCodeByCn(activeTab)].block"
    :key="blockItem.block_id"
  >
    <div class="showWrap">
      <span class="block-name">第{{ index + 1 }}區塊，共{{ data.content[getCodeByCn(activeTab)].block.length
      }}個</span>
    </div>
    <div
      class="wrap"
      style="border-top: 10px solid #4ca2ae;"
    >
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
      </div>
      <problemAll :index="index" />

    </div>


    <p
      class="footer"
      v-if="blockItem.isShowBlockChoose"
    >
      <span class="text">於區段{{ index + 1 }}後 </span> <n-select
        :bordered="false"
        class="block-choose-width"
        v-model:value="blockItem.nextStep"
        :options="blockOptions(index)"
      />
    </p>
  </div>
</template>

<style scoped>
.block-name {
  font-size: 1rem;
}

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

.form-create-wrap-question {
  --green: #4ca2ae;
  --grey: rgba(0, 0, 0, .5);
  position: relative;
  width: 80%;
  margin: 0 auto;
}

.wrap-question {
  width: 780px;
  min-height: 100px;
  margin: 0 auto;
  display: flex;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .1);
  flex-direction: column;
}

.showWrap {
  color: white;
  background-color: #4ca2ae;
  border-radius: 12% 12% 0% 0%;
  width: 200px;
  min-height: 40px;
  margin: 0 7.7rem;
  position: absolute;
  /* 讓它脫離正常文檔流 */
  top: -2rem;
  /* 調整到 wrap 之上 */
  left: 0;
  /* 靠左對齊 */
  text-align: center;

}

.wrap {
  width: 780px;
  min-height: 100px;
  margin: 0 auto;
  margin-top: 4.2rem;
  display: flex;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .1);
  flex-direction: column;
  position: relative;
  /* 必須設置 relative，這樣 absolute 定位才是相對於這個元素 */
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

  .showWrap {
    width: 40%;
    margin: 0rem;
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
