<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center" @click="onClick">
            <div class="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md z-50 animate-fadeIn">
                <h2 class="text-xl font-semibold mb-4 text-gray-800"> {{ (message) }} </h2>
                <div class="flex justify-end mt-6 gap-2">
                    <button class="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition cursor-pointer" @click="cancel"> {{ $t('cancel') }} </button>
                    <button class="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" @click="confirm"> {{ $t('confirm') }} </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">

const props = defineProps({
    show: Boolean,
    message: String
});

const emit = defineEmits(['confirm', 'cancel']);
const confirm = () => { emit('confirm', true); };
const cancel = () => { emit('cancel'); };
const onClick = (event: MouseEvent) => { event.stopPropagation(); }

</script>

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
