import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRegionStore = defineStore('region', () => {

    const country = ref('au');

    const setRegion = (code = 'au') => {
        if (!['au', 'cn', 'us', 'jp'].includes(code)) {
            return
        }
        country.value = code
    }

    return {
        country,
        setRegion
    };
});