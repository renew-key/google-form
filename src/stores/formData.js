import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useFormDataStore = defineStore('formData', () => {
  // 使用 reactive 來創建反應式的資料結構
  const data = reactive({
    languages: ['zh'], // 預設語言為繁體中文
    content: {
      zh: {
        // 初始化繁體中文的資料
        title: [{ questionnaire_title: '預設標題', desc: '預設描述' }],
        block: [
          {
            blockTitle: [{ questionnaire_blockTitle: '預設區塊標題', desc: '區塊描述' }],
            question: [
              {
                question_id: 1,
                types: '單選題',
                is_required: false,
                content: [
                  {
                    title: '問題標題',
                    answer: [
                      {
                        answer_id: 1,
                        description: '選項描述',
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

  return { data }
})
