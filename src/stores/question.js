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

  // 常數定義
  const addRadio = ref('添加選項')
  const addOther = ref('其他')

  // 顯示選項
  const selectOptions = ref([
    { label: '單選題', value: '單選題' },
    { label: '多選題', value: '多選題' },
    { label: '下拉列表', value: '下拉列表' },
    { label: '線性量表', value: '線性量表' },
    { label: '文本題', value: '文本題' },
  ])

  // 記錄 answerId
  let answerIdCounter = 2

  // 產生唯一的 answerId
  const generateUniqueAnswerId = () => answerIdCounter++

  // 重新排序 list
  const reorderList = (list) => {
    list.forEach((item, index) => {
      item.order = index + 1 // 設置 order 為索引值+1，保證連續
    })
  }

  // 刪除選項
  const deleteRadioFn = (l, i, j, k) => {
    let list =
      data.value.content[getCodeByCn(activeTab.value)].block[l].question[i].content[j].answer
    list.splice(k, 1)
    reorderList(list) // 重新排列 order
    console.log(list)
  }

  // 新增 "其他" 選項
  const addOtherFn = (l, i, j) => {
    let list =
      data.value.content[getCodeByCn(activeTab.value)].block[l].question[i].content[j].answer

    // 確保 "其他" 只會新增一次
    const hasOther = list.some((item) => item.isOther)
    if (!hasOther) {
      const newOrder = list.length > 0 ? list[list.length - 1].order + 1 : 1
      const newAnswerId = generateUniqueAnswerId()

      list.push({
        nextStep: 'next',
        order: newOrder,
        answer_id: newAnswerId,
        description: '其他...',
        isOther: true,
      })
    }
    reorderList(list) // 重新排列 order
    console.log(list)
  }

  // 新增一般選項 (處理 "其他" 的邏輯)
  const addRadioFn = (l, i, j) => {
    let list =
      data.value.content[getCodeByCn(activeTab.value)].block[l].question[i].content[j].answer
    const otherIndex = list.findIndex((item) => item.isOther)
    const newOrder = list.length > 0 ? list[list.length - 1].order + 1 : 1
    const newAnswerId = generateUniqueAnswerId()

    if (otherIndex !== -1) {
      const otherItem = list.splice(otherIndex, 1)[0]
      list.push({
        nextStep: 'next',
        order: newOrder,
        answer_id: newAnswerId,
        description: null,
        isOther: false,
      })
      otherItem.order = newOrder + 1
      list.push(otherItem) // 把 "其他" 選項放回最後
    } else {
      list.push({
        order: newOrder,
        answer_id: newAnswerId,
        nextStep: 'next',
        description: null,
        isOther: false,
      })
    }
    reorderList(list) // 重新排列 order
    console.log(list)
  }

  return {
    selectOptions,
    addRadio,
    addOther,
    deleteRadioFn,
    addRadioFn,
    addOtherFn,
  }
})
