<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import barsIcon from "../assets/bars-2.5.svg";
import langIcon from "../assets/lang-switch.svg";
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

// 控制菜单的显示状态
const isOpen = ref(false);

// 监听点击外部事件
const menuRef = ref<HTMLDivElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
        isOpen.value = false;
    }
};

// 挂载和卸载全局点击监听器
onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});
onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

const primaryText = computed(() => (locale.value === 'zh' ? '中文' : 'English'));
const secondaryText = computed(() => (locale.value === 'zh' ? 'English' : '中文'));

const switchLanguage = () => {
    locale.value = locale.value === 'zh' ? 'en' : 'zh';
    localStorage.setItem('lang', locale.value);
};

</script>

<template>
    <div class="fixed top-4 right-4">
        <div class="relative" ref="menuRef">
            <button @click="isOpen = !isOpen" class="p-2 rounded-full bg-white shadow-lg hover:bg-gray-200 cursor-pointer">
                <img :src="barsIcon" alt="menu" class="w-8 h-8">
            </button>
            <div v-show="isOpen" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
                <a href="#" class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" @click.prevent="switchLanguage">
                    <img :src="langIcon" alt="" class="w-5 h-5" />
                    <span class="text-[16px] font-bold">{{ primaryText }}</span> / <span class="text-[11px] hover:underline text-gray-400">{{ secondaryText }}</span>
                </a>
            </div>
        </div>
    </div>
</template>
