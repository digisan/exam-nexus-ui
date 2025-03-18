<template>
    <h2>
        Dashboard
    </h2>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { storeToRefs } from 'pinia';

const router = useRouter()
const authStore = useAuthStore()
const { user, token } = storeToRefs(authStore)

</script>

<style>
.container {
    width: 100%;
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* 确保 label 左对齐 */
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
    /* 让 label 和输入框有间距 */
}

input {
    width: 100%;
    padding: 8px;
    margin: 5px -10px;
    border: 1px solid #ccc;
}

button {
    width: 100%;
    padding: 10px;
    background: #42b983;
    color: white;
    border: none;
    cursor: pointer;
}
</style>