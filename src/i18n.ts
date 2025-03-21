import { createI18n } from 'vue-i18n';

// 语言包
import en from './locales/en.json';
import zh from './locales/zh.json';

// 获取本地存储的语言设置，默认使用中文
const savedLanguage = localStorage.getItem('lang') || 'zh';

const i18n = createI18n({
    legacy: false,
    locale: savedLanguage,
    fallbackLocale: 'en', // 备用语言，防止 key 丢失
    messages: { en, zh },
    fallbackWarn: true,  // 控制台警告缺失的 key
    missingWarn: true    // 控制台警告未找到的 key
});

export default i18n;
