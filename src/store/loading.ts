import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {

    const isLoading = ref(false);
    const message = ref('loading');

    const showLoading = (msg = 'loading') => {
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
