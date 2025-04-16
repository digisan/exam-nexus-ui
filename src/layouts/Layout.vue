<!-- src/layouts/Layout.vue -->

<!-- <template>
    <div class="flex h-screen">

        <aside class="w-64 bg-gray-800 text-white p-4 space-y-4">
            <RouterLink to="/" class="block px-4 py-2 rounded hover:bg-gray-700">首页</RouterLink>
            <RouterLink to="/about" class="block px-4 py-2 rounded hover:bg-gray-700">关于我们</RouterLink>
            <RouterLink to="/contact" class="block px-4 py-2 rounded hover:bg-gray-700">联系我们</RouterLink>
        </aside>

        <main class="flex-1 p-6">
            <RouterView />
        </main>
    </div>
</template> -->

<template>

    <router-view name="righttop_menu" />

    <div v-if="!authStore.user" class="flex flex-col items-center justify-center min-h-screen">
        <router-view />
    </div>

    <div v-if="authStore.user" class="flex h-screen">
        <router-view name="side_menu" />
        <!-- <router-view /> -->
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();

</script>

<style scoped></style>