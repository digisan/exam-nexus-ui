<!-- <script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <div>
        <a href="https://vite.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->

<!-- --------------------------------------------------------------------------- -->

<template>

    <LangSwitcher></LangSwitcher>

    <div class="flex flex-col items-center justify-center min-h-screen">
        <nav class="max-w-[400px] w-full flex flex-row-reverse mr-2 text-gray-500 bg-blue-10">
            <router-link v-if="showLinkIn" to="/login">{{ $t('login') }}</router-link>
            <router-link v-if="showLinkReg" to="/register">{{ $t('register') }}</router-link>
        </nav>
        <router-view></router-view>
    </div>

    <!-- <nav class="fixed top-0 right-0 mt-4 mr-4">
        <router-link v-if="showLinkOut" to="/">{{ $t('logout') }}</router-link>
    </nav> -->

</template>

<script setup>
import { ref } from 'vue';
import { useUIStore } from './store/ui';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import LangSwitcher from './components/LangSwitcher.vue';

const { locale, t } = useI18n();

const uiStore = useUIStore();
const { showLinkReg, showLinkIn, showLinkOut } = storeToRefs(uiStore);

</script>

<style scoped></style>