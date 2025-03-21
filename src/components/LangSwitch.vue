<template>
    <div class="language-switcher">
        <a href="#" class="lang-toggle" @click.prevent="switchLanguage">
            <span class="primary">{{ primaryText }}</span>/<span class="secondary">{{ secondaryText }}</span>
        </a>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

// 计算显示的文本
const primaryText = computed(() => (locale.value === 'zh' ? '中' : 'Eng'));
const secondaryText = computed(() => (locale.value === 'zh' ? 'Eng' : '中'));

const switchLanguage = () => {
    locale.value = locale.value === 'zh' ? 'en' : 'zh';
    localStorage.setItem('lang', locale.value);
};
</script>

<style scoped>
.language-switcher {
    position: absolute;
    top: 10px;
    right: 20px;
}

.lang-toggle {
    text-decoration: none;
    color: inherit;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
}

.lang-toggle .primary {
    font-size: 13px;
    font-weight: 700;
}

.lang-toggle .secondary {
    font-size: 10px;
    font-weight: 400;
    opacity: 0.9;
}

.lang-toggle:hover .secondary {
    text-decoration: underline;
}
</style>