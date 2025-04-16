import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
    const isLoading = ref(false);
    const message = ref('加载中...');

    function showLoading(msg = '加载中...') {
        message.value = msg;
        isLoading.value = true;
    }

    function hideLoading() {
        isLoading.value = false;
    }

    return {
        isLoading,
        message,
        showLoading,
        hideLoading,
    };
});
