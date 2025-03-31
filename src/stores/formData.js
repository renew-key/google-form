import { defineStore, storeToRefs } from 'pinia'
import { reactive, watchEffect } from 'vue'
import { useLangStore } from '@/stores/lang.js'

export const useFormDataStore = defineStore('formData', () => {
  const LangStore = useLangStore()
  const { activeTab } = storeToRefs(LangStore)
  const { getCodeByCn } = LangStore
  const data = reactive({
    languages: ['zh'], // 預設語言為繁體中文
    content: {
      zh: {
        // 初始化繁體中文的資料
        title: { questionnaire_title: '', desc: '' },
        block: [
          {
            isShowBlockChoose: false,
            nextStep: 'next', // 預設為最後區塊設為 send
            order: 1,
            block_id: 1,
            blockTitle: { questionnaire_blockTitle: '', desc: '' },
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
                        originalIndex: 1,
                        order: 1,
                        answer_id: 1,
                        nextStep: 'next',
                        description: '',
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
          },
        ],
      },
    },
  })

  const sendLast = () => {
    const blocks = data.value.content[getCodeByCn(activeTab.value)].block
    blocks.forEach((block, index) => {
      // 如果是最後一個區段，將 nextStep 設為 'send'
      if (index === blocks.length - 1) {
        block.nextStep = 'send'
        const contents = block.question
        contents.forEach((content) => {
          if (content.nextStep == 'next') {
            content.nextStep = 'send'
          }
        })
      }
    })
  }

  return { data }
})
