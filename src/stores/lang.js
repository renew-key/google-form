import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useFormDataStore } from '@/stores/formData.js'

export const useLangStore = defineStore('lang', () => {
  const FormDataStore = useFormDataStore()
  const { data } = storeToRefs(FormDataStore)

  const langSelect = ref([
    { cn: '繁體中文', code: 'zh' },
    { cn: '簡體中文', code: 'cn' },
    { cn: '英語', code: 'en' },
    { cn: '韓語', code: 'kr' },
    { cn: '日語', code: 'jp' },
    { cn: '法語', code: 'fr' },
    { cn: '德語', code: 'de' },
    { cn: '俄語', code: 'ru' },
    { cn: '西班牙語', code: 'sp' },
    { cn: '葡萄牙語', code: 'po' },
    { cn: '義大利語', code: 'it' },
    { cn: '荷蘭語', code: 'nl' },
    { cn: '印度語', code: 'id' },
    { cn: '土耳其語', code: 'tr' },
    { cn: '泰語', code: 'thai' },
    { cn: '波斯語', code: 'fa' },
    { cn: '羅馬尼亞語', code: 'ro' },
    { cn: '阿拉伯語', code: 'ar' },
  ])

  const tabs = ref(['繁體中文']) // 預設為 '繁體中文'
  const activeTab = ref('繁體中文')

  // 使用 getAllCodesByCn 來獲取對應的代碼
  const getCnByCode = (code) => {
    const lang = langSelect.value.find((lang) => lang.code === code)
    return lang ? lang.cn : null
  }

  const getCodeByCn = (cn) => {
    const lang = langSelect.value.find((lang) => lang.cn === cn)
    return lang ? lang.code : null
  }

  const getAllCnByCode = (codeList) => {
    return codeList.map((code) => getCnByCode(code))
  }

  const getAllCodesByCn = (cnList) => {
    return cnList.map((cn) => getCodeByCn(cn))
  }

  const createEmptyLanguageData = () => ({
    title: [{ questionnaire_title: '', desc: '' }],
    block: [
      {
        blockTitle: [{ questionnaire_blockTitle: '', desc: '' }],
        question: [
          {
            question_id: 1,
            types: '單選題',
            is_required: false,
            content: [
              {
                title: '',
                answer: [
                  {
                    answer_id: 1,
                    description: null,
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
  })

  const handleAddLan = (lang) => {
    const cn = getCnByCode(lang)
    if (!cn || tabs.value.includes(cn)) {
      return false
    }

    tabs.value.push(cn)
    data.value.languages.push(lang)
    data.value.content[lang] = createEmptyLanguageData()
    // console.log(data.value)
    return true
  }

  const handleDeleteTab = (lang) => {
    const code = getCodeByCn(lang)
    const index = tabs.value.indexOf(lang)
    if (index !== -1) {
      // 刪除 tabs 中的語言
      tabs.value.splice(index, 1)
      // console.log(tabs.value)

      // 如果當前活躍的 tab 被刪除，則更新 activeTab
      if (activeTab.value === lang) {
        activeTab.value = tabs.value.length ? tabs.value[tabs.value.length - 1] : ''
      }

      // 刪除 data.languages 和對應的 content
      if (data.value.languages.includes(code)) {
        data.value.languages = data.value.languages.filter((l) => l !== code) // 修正變數名稱
        delete data.value.content[code] // 刪除對應語言的資料
      }

      // console.log(data.value)
    }
  }

  return {
    langSelect,
    tabs,
    activeTab,
    handleAddLan,
    handleDeleteTab,
    getCnByCode,
    getCodeByCn,
    getAllCnByCode,
    getAllCodesByCn,
  }
})
