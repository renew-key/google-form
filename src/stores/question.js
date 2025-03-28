import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useFormDataStore } from '@/stores/formData.js'
import { useLangStore } from '@/stores/lang.js'

export const useQuestionStore = defineStore('question', () => {
  const LangStore = useLangStore()
  const { activeTab } = storeToRefs(LangStore)
  const { getCodeByCn } = LangStore
  const FormDataStore = useFormDataStore()
  const { data } = storeToRefs(FormDataStore)
  const addRadio = ref('添加選項')
  const addOther = ref('其他')

  const selectOptions = ref([
    {
      label: '單選題',
      value: '單選題',
    },
    {
      label: '多選題',
      value: '多選題',
    },
    {
      label: '下拉列表',
      value: '下拉列表',
    },
    {
      label: '線性量表',
      value: '線性量表',
    },
    {
      label: '文本題',
      value: '文本題',
    },
  ])

  return { selectOptions, addRadio, addOther }
})
