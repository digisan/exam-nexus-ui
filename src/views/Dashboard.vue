<template>
    <h2>
        Dashboard
    </h2>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useUIStore } from '../store/ui';
import { storeToRefs } from 'pinia';

const router = useRouter()

const authStore = useAuthStore()
const { user, token } = storeToRefs(authStore)

const uiStore = useUIStore()

onMounted(async () => {
    const isValid = await authStore.isTokenValid();
    if (!isValid) {
        router.push({ name: 'Login' });
        return
    }
    
    uiStore.styleDashboard();
});

</script>

<style scoped></style>