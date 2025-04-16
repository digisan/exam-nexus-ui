import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {

    const isLoading = ref(false);
    const message = ref('加载中...');

    const showLoading = (msg = '加载中...') => {
        message.value = msg;
        isLoading.value = true;
    }

    const hideLoading = () => {
        isLoading.value = false;
    }

    return {
        isLoading,
        message,
        showLoading,
        hideLoading,
    };
});
