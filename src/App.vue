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
    <LangSwitch></LangSwitch>
    <nav class="register-login">
        <router-link v-if="showLinkIn" to="/login">{{ $t('login') }}</router-link>
        <router-link v-if="showLinkReg" to="/register">{{ $t('register') }}</router-link>
    </nav>
    <nav class="logout">
        <router-link v-if="showLinkOut" to="/">{{ $t('logout') }}</router-link>
    </nav>
    <router-view></router-view>
</template>

<script setup>
import { ref } from 'vue';
import { useUIStore } from './store/ui';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import LangSwitch from './components/LangSwitch.vue';

const { locale, t } = useI18n();

const uiStore = useUIStore();
const { showLinkReg, showLinkIn, showLinkOut } = storeToRefs(uiStore);

</script>

<style scoped>
.register-login {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 10px;
}

.logout {
    position: absolute;
    top: 10px;
    right: 120px;
}

a {
    font-size: 16px;
    text-decoration: none;
    color: #6fa8fd;
}
</style>