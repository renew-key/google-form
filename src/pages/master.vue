<script setup>
import { useMessage, NIcon } from "naive-ui";
import { Add } from "@vicons/ionicons5";
import { storeToRefs } from "pinia";
import { useLangStore } from "@/stores/lang.js";
import { useFormStyleStore } from "@/stores/formStyle.js";
import { useFormDataStore } from "@/stores/formData.js";
import { useBlockStore } from "@/stores/block.js";
const blockStore = useBlockStore();
const { addBlock } = blockStore;
const { blockLen } = storeToRefs(blockStore)
const formDataStore = useFormDataStore();
const { data } = storeToRefs(formDataStore)
const formStyleStore = useFormStyleStore();
const { focusIndex } = storeToRefs(formStyleStore);
const { focusTitle } = formStyleStore;
const LangStore = useLangStore();
const { activeTab } = storeToRefs(LangStore)
const { getCodeByCn } = LangStore;
const message = useMessage();


// console.log(activeTab)



</script>

<template>
  <LangAdd />

  <div class="form-create-wrap">
    <div class="wrap">
      <div
        class="item title"
        @click="focusTitle($event)"
        :class="{ 'title-focus': focusIndex === -1 }"
      >
        <langTab />
        <title2 />
      </div>
      <div
        class="add-list"
        v-show="blockLen == 0"
      >
        <n-icon
          @click="addBlock(getCodeByCn(activeTab), 0)"
          class="el-icon-plus"
          size="20"
        >
          <Add />
        </n-icon>
      </div>
    </div>
  </div>

  <block />

</template>
<style scoped>
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

.form-create-wrap .add-list {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .24);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.el-icon-plus {
  background-color: #fff;
}

/*.form-sidebar {
  flex: 1;
  flex-grow: 0;
  align-self: flex-end;
  display: inline-block;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .24);
}

.form-sidebar .sidebar-li {
  cursor: pointer;
  padding: 10px 12px;
}*/



@media (max-width: 920px) {
  .form-create-wrap {
    width: 100%;
    padding-right: 0.2rem;
    margin: 0;

  }

  .form-create-wrap .wrap {
    width: 100%;

  }

}
</style>
