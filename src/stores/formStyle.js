import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFormStyleStore = defineStore('formStyle', () => {
  const focusIndex = ref(0)

  const handleFocus = (event, index) => {
    let classList = event.target.classList
    const ignoreClasses = ['add-list', 'el-icon-plus', 'el-icon-delete', 'icon-copy']

    // 如果點擊的元素屬於忽略的 class，則不改變 focusIndex
    if (ignoreClasses.some((cls) => classList.contains(cls)) || focusIndex.value === index) return

    focusIndex.value = index
  }

  return {
    focusIndex,
    focusTitle: (event) => handleFocus(event, -1),
    focusBlockTitle: (event, index) => handleFocus(event, index),
    focusItem: (event, i) => handleFocus(event, i),
  }
})
