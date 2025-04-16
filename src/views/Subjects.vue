<template>
    <div class="flex items-center justify-center h-screen w-screen">
        <h2 class="text-2xl font-bold">{{ $t('subjects') }}</h2>
    </div>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { storeToRefs } from 'pinia';

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