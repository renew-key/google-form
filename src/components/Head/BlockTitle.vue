<script setup>
defineProps({
  tabs: Array,
  activeTab: String,
  focusIndex: [String, Number],
  langCode: Array,
  langList: Array,
});

const emit = defineEmits(['focusBlockTitle', 'deleteTab', 'addTab', 'activeTab']);
</script>

<template>
  <div
    class="item title"
    @click="emit('focusBlockTitle', $event)"
    :class="{ 'title-focus': focusIndex === -2 }"
  >
    <BTitle
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