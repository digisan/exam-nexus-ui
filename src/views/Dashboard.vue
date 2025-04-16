<template>
    <div class="flex items-center justify-center h-screen w-screen">
        <h2 class="text-2xl font-bold">{{ $t('dashboard') }}</h2>
    </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/auth';

const router = useRouter()
const authStore = useAuthStore()
const { user, token } = storeToRefs(authStore)

onMounted(async () => {
    const isValid = await authStore.isTokenValid();
    if (!isValid) {
        router.push({ name: 'Login' });
        return
    }
});

</script>

<style scoped></style>