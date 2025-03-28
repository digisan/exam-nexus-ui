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

    <SysMenu></SysMenu>

    <div class="flex flex-col items-center justify-center min-h-screen">
        <nav class="max-w-[400px] w-full flex flex-row-reverse mr-2 text-blue-600 bg-blue-10 m-[0px_0px_5px_0px]">
            <router-link v-if="showLinkIn" to="/login">{{ $t('login') }}</router-link>
            <router-link v-if="showLinkReg" to="/register">{{ $t('register') }}</router-link>
        </nav>
        <router-view />
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useUIStore } from '../store/ui';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import SysMenu from '../components/SysMenu.vue';

const { locale, t } = useI18n();

const uiStore = useUIStore();
const { showLinkReg, showLinkIn } = storeToRefs(uiStore);

</script>

<style scoped></style>