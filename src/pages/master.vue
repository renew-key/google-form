<script setup>
import { useMessage, NIcon } from "naive-ui";
import { Add } from "@vicons/ionicons5";
import { storeToRefs } from "pinia";
import { useLangStore } from "@/stores/lang.js";
import { useFormStyleStore } from "@/stores/formStyle.js";
import { useFormDataStore } from "@/stores/formData.js";
const formDataStore = useFormDataStore();
const formStyleStore = useFormStyleStore();
const { focusIndex } = storeToRefs(formStyleStore);
const { focusTitle, focusBlockTitle, focusItem } = formStyleStore;
const LangStore = useLangStore();
const { handleDeleteTab, handleAddLan } = LangStore;
const message = useMessage();


</script>

<template>
  <LangAdd />

  <div class="form-create-wrap">
    <div class="wrap">
      <langTab />
    </div>
  </div>

</template>
<style scoped>
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
  bottom: 66px;
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
