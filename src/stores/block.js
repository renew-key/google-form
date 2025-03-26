import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useFormDataStore } from '@/stores/formData.js'

export const useBlockStore = defineStore('block', () => {
  const FormDataStore = useFormDataStore()
  const { data } = storeToRefs(FormDataStore)
  // 定義移動 block 的 function，處理多語言
  const moveBlock = (fromIndex, toIndex) => {
    // 取得所有語言的名稱
    const languages = data.value.languages

    // 對每個語言，處理對應的 block 移動
    languages.forEach((lang) => {
      const blocks = data.value.content[lang].block

      // 移動指定索引的 block
      const block = blocks.splice(fromIndex, 1)[0] // 移除要移動的區塊
      blocks.splice(toIndex, 0, block) // 在新的位置插入區塊

      // 更新 order，確保其順序正確
      blocks.forEach((block, index) => {
        block.order = index + 1 // 重新計算 order，從 1 開始
      })
    })
  }

  // 新增區塊，插入到所點擊的區塊下一個位置
  const addBlock = (lang, index) => {
    const newBlock = {
      order: data.value.content[lang].block.length + 1, // 計算新區塊的 order
      block_id: data.value.content[lang].block.length + 1, // 設定新的 block_id
      blockTitle: { questionnaire_blockTitle: '', desc: '' },
      question: [],
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

  return { moveBlock, addBlock, copyBlock, deleteBlock, mergeBlock }
})
