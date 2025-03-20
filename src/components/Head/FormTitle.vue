<script setup>
defineProps({
  tabs: Array,
  activeTab: String,
  focusIndex: String,
  langCode: Array,
  langList: Array,
});

const emit = defineEmits(['focusTitle', 'deleteTab', 'addTab', 'activeTab']);
</script>

<template>
  <div
    class="item title"
    @click="emit('focusTitle', $event)"
    :class="{ 'title-focus': focusIndex === 'title' }"
  >
    <h1 class="form-title">活動報名表單設計</h1>
    <Tab
      :tabs="tabs"
      @deleteTab="emit('deleteTab', $event)"
      @AddTab="emit('addTab')"
      @activeTab="emit('activeTab', $event)"
    />
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