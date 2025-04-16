<template>
    <transition name="fade">
        <div v-if="loadingStore.isLoading" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="text-white text-lg animate-pulse">
                {{ $t(loadingStore.message) }}
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { useLoadingStore } from '../store/loading';

const loadingStore = useLoadingStore();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>