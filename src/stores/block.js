import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useFormDataStore } from '@/stores/formData.js'
import { useLangStore } from '@/stores/lang.js'

export const useBlockStore = defineStore('block', () => {
  const LangStore = useLangStore()
  const { activeTab } = storeToRefs(LangStore)
  const { getCodeByCn } = LangStore
  const FormDataStore = useFormDataStore()
  const { data } = storeToRefs(FormDataStore)
  // 新增 tempBlocks 來暫存拖曳後的排序
  const tempBlocks = ref([])
  // 監聽 activeTab 變更時，初始化 tempBlocks
  watchEffect(() => {
    const lang = getCodeByCn(activeTab.value)
    tempBlocks.value = [...data.value.content[lang].block]
    // console.log(tempBlocks.value)
  })

  // 移動 block，不影響正式數據
  const moveBlock = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex > tempBlocks.value.length - 1) {
      return
    }
    // console.log(fromIndex, toIndex)
    const item = tempBlocks.value.splice(fromIndex, 1)[0]
    tempBlocks.value.splice(toIndex, 0, item)
  }

  // 確認移動，將 tempBlocks 實際寫入 data.value
  const confirmMove = () => {
    const lang = getCodeByCn(activeTab.value)
    data.value.content[lang].block = [...tempBlocks.value]

    // 重新計算 order
    data.value.content[lang].block.forEach((block, index) => {
      block.order = index + 1
    })
  }

  const cancelMove = () => {
    tempBlocks.value = []
  }

  // 拖曳結束後的回調函數
  const onDragEnd = (evt) => {
    console.log(evt.oldIndex, evt.newIndex)
    moveBlock(evt.oldIndex - 2, evt.newIndex - 2) // 只影響 tempBlocks
    // console.log(evt.oldIndex - 2, evt.newIndex - 2)
  }

  // 新增區塊，插入到所點擊的區塊下一個位置
  const addBlock = (lang, index) => {
    const newBlock = {
      order: data.value.content[lang].block.length + 1, // 計算新區塊的 order
      block_id: data.value.content[lang].block.length + 1, // 設定新的 block_id
      blockTitle: { questionnaire_blockTitle: '', desc: '' },
      nextStep: 'next',
      question: [
        {
          order: 1,
          question_id: 1,
          types: '單選題',
          is_required: false,
          content: [
            {
              title: '',
              answer: [
                {
                  order: 1,
                  answer_id: 1,
                  nextStep: 'next',
                  description: null,
                  isOther: false,
                },
              ],
              line_answer: {
                line_value: 1,
                line_end_value: 5,
                line_tag: '',
                line_end_tag: '',
              },
              text_answer: '',
            },
          ],
        },
      ],
    }

    // 在指定的 index 後插入新 block
    data.value.content[lang].block.splice(index + 1, 0, newBlock)

    // 更新所有 block 的 order
    updateBlockOrders(lang)
  }

  // 複製區塊，插入到所點擊的區塊下一個位置
  const copyBlock = (lang, index) => {
    const blockToCopy = JSON.parse(JSON.stringify(data.value.content[lang].block[index])) // 深複製要複製的區塊
    blockToCopy.order = data.value.content[lang].block.length + 1 // 設定新的 order

    // 插入複製的區塊到指定位置的下一個位置
    data.value.content[lang].block.splice(index + 1, 0, blockToCopy)

    // 更新所有 block 的 order
    updateBlockOrders(lang)
  }

  // 刪除區塊
  const deleteBlock = (lang, index) => {
    data.value.content[lang].block.splice(index, 1) // 刪除指定索引的區塊

    // 更新所有 block 的 order
    updateBlockOrders(lang)
  }

  const mergeBlock = (lang, index) => {
    if (index <= 0) return // 第一個 block 不能合併

    const blocks = data.value.content[lang].block
    const currentBlock = blocks[index]
    const previousBlock = blocks[index - 1]

    // 如果前一個 blockTitle 為空，則使用當前 block 的 blockTitle
    if (!previousBlock.blockTitle.questionnaire_blockTitle.trim()) {
      previousBlock.blockTitle.questionnaire_blockTitle =
        currentBlock.blockTitle.questionnaire_blockTitle
    }
    if (!previousBlock.blockTitle.desc.trim()) {
      previousBlock.blockTitle.desc = currentBlock.blockTitle.desc
    }

    // 把 question 合併到前一個 block
    previousBlock.question.push(...currentBlock.question)

    // 移除當前的 block
    blocks.splice(index, 1)

    // 更新所有 block 的 order
    updateBlockOrders(lang)
  }

  // 更新所有 block 的 order
  const updateBlockOrders = (lang) => {
    data.value.content[lang].block.forEach((block, index) => {
      block.order = index + 1 // 重新計算 order，從 1 開始
    })
  }

  const blockLen = computed(() => {
    return data.value.content[getCodeByCn(activeTab.value)].block.length
  })

  const blockOptions = (index) => {
    const blocks = data.value.content[getCodeByCn(activeTab.value)].block
    const currentBlockOrder = index + 1 // 獲取當前選擇的區段順序
    // console.log(currentBlockOrder)
    return [
      { label: '前往下個區段', value: 'next' },
      ...blocks
        .filter((block) => block.order !== currentBlockOrder) // 排除當前區段
        .map((block) => ({
          label: `前往區段 ${block.order} (${block.blockTitle.questionnaire_blockTitle || '無標題'})`,
          value: `block_${block.block_id}`,
        })),
      { label: '提交表單', value: 'send' },
    ]
  }

  return {
    moveBlock,
    addBlock,
    copyBlock,
    deleteBlock,
    mergeBlock,
    blockOptions,
    onDragEnd,
    confirmMove,
    cancelMove,
    blockLen,
    tempBlocks,
  }
})
