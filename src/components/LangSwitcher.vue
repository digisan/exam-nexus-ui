<template>
    <div class="fixed top-0 right-0 mt-2 mr-3">
        <a href="#" class="cursor-pointer" @click.prevent="switchLanguage">
            <span class="text-[14px] font-bold">{{ primaryText }}</span>/<span class="text-[12px] hover:underline text-gray-400">{{ secondaryText }}</span>
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

<style scoped></style>