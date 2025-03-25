import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLangStore = defineStore('lang', () => {
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

  const getCnByCode = (code) => {
    const lang = langSelect.value.find((lang) => lang.code === code)
    return lang ? lang.cn : null // 若找不到則回傳 '未知語言'
  }

  const handleAddLan = (lang) => {
    const cn = getCnByCode(lang)
    if (tabs.value.includes(cn)) {
      return false
    }

    if (cn) {
      tabs.value.push(cn)
    }
    // console.log(tabs.value)
    return true
  }

  const handleDeleteTab = (lang) => {
    const index = tabs.value.indexOf(lang)
    if (index !== -1) {
      tabs.value.splice(index, 1)
      if (activeTab.value === lang) {
        activeTab.value = tabs.value.length ? tabs.value[tabs.value.length - 1] : ''
      }
    }
  }

  return { langSelect, tabs, activeTab, handleAddLan, handleDeleteTab, getCnByCode }
})
