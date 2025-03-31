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

  const deleteRadioFn = (l, i, j, k) => {
    data.value.content[getCodeByCn(activeTab.value)].block[l].question[i].content[j].answer.splice(
      k,
      1,
    )
  }

  const addOtherFn = (l, i, j) => {
    let list =
      data.value.content[getCodeByCn(activeTab.value)].block[l].question[i].content[j].answer
    // 確保 "其他" 只會新增一次
    const hasOther = list.some((item) => item.isOther)

    if (!hasOther) {
      list.push({
        answer_id: list.length + 1,
        description: '其他...',
        isOther: true,
      })
    }
  }

  const addRadioFn = (l, i, j) => {
    let list =
      data.value.content[getCodeByCn(activeTab.value)].block[l].question[i].content[j].answer
    // 檢查是否已經有 "其他" 選項
    const otherIndex = list.findIndex((item) => item.isOther)
    if (otherIndex !== -1) {
      // 先移除 "其他" 選項，避免 `list = list.filter(...)` 破壞響應式
      const otherItem = list[otherIndex]
      list.splice(otherIndex, 1)

      // 新增一般選項
      list.push({ answer_id: list.length + 1, description: null, isOther: false })

      // 把 "其他" 選項加回來，確保它在最後
      list.push(otherItem)
    } else {
      // 沒有 "其他" 選項時，直接新增
      list.push({ answer_id: list.length + 1, description: null, isOther: false })
    }
  }

  return { selectOptions, addRadio, addOther, deleteRadioFn, addRadioFn, addOtherFn }
})
