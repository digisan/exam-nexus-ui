import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRegionStore = defineStore('region', () => {

    const country = ref('au');

    // const showLoading = (msg = '加载中...') => {
    //     message.value = msg;
    //     isLoading.value = true;
    // }

    // const hideLoading = () => {
    //     isLoading.value = false;
    // }

    // return {
    //     isLoading,
    //     message,
    //     showLoading,
    //     hideLoading,
    // };
});