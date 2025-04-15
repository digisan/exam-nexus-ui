<script setup lang="ts">
import { ref, watch } from 'vue';
import 'flag-icons/css/flag-icons.min.css';

const props = defineProps({
    show: Boolean,
    countries: {
        type: Array as () => { code: string; name: string; flag: string }[],
        required: true,
    },
});

const emit = defineEmits(['confirm', 'cancel']);
const selected = ref('');
const showDropdown = ref(false);

watch(() => props.show, (val) => {
    if (!val) {
        selected.value = '';
        showDropdown.value = false;
    }
});

const confirm = () => {
    if (selected.value) {
        emit('confirm', selected.value);
    }
};

const cancel = () => {
    emit('cancel');
};
</script>

<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div class="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md z-50 animate-fadeIn">
                <h2 class="text-xl font-semibold mb-4 text-gray-800">
                    {{ ('selectRegion') }}
                </h2>

                <!-- 自定义下拉菜单 -->
                <div class="relative">
                    <button class="w-full p-3 border border-gray-300 rounded-md flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500" @click="showDropdown = !showDropdown">
                        <!-- 选定内容 -->
                        <span v-if="selected">
                            <span :class="`fi fi-${selected} w-6 h-4 inline mr-2`"></span>
                            {{countries.find((c) => c.code === selected)?.name}}
                        </span>
                        <!-- 未选定状态 -->
                        <span v-else class="text-gray-400"> {{ ('pleaseSelect') }} </span>
                        <!-- 下拉箭头 -->
                        <svg class="w-5 h-5 ml-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <!-- 下拉菜单 -->
                    <div v-if="showDropdown" class="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-64 overflow-y-auto" @click.stop>
                        <div v-for="country in countries" :key="country.code" @click="selected = country.code; showDropdown = false" class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                            <span :class="`fi fi-${country.code} w-6 h-4 inline mr-2`"></span>
                            {{ country.name }}
                        </div>
                    </div>
                </div>

                <div class="flex justify-end mt-6 gap-2">
                    <button class="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition cursor-pointer" @click="cancel"> {{ ('cancel') }} </button>
                    <button class="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" :disabled="!selected" @click="confirm"> {{ ('confirm') }} </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@keyframes fadeIn {
    0% {
        transform: translateY(20px);
        opacity: 0;
    }

    100% {
        transform: translateY(0px);
        opacity: 1;
    }
}

.animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
}
</style>
