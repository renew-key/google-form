<script setup>
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


const emit = defineEmits(['focusTitle', 'deleteTab', 'addTab', 'activeTab']);
</script>

<template>
  <div
    class="item title"
    @click="focusTitle($event)"
    :class="{ 'title-focus': focusIndex === -1 }"
  >
  <langTab />
    <Title
      :langCode="langCode"
      :langList="langList"
      :tabs="tabs"
      :tabLang="activeTab"
    />
  </div>
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
</style>