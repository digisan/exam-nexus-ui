<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

const test = async () => {
    count.value++;

    const res = await fetch("https://api64.ipify.org?format=json");
    const data = await res.json();
    alert(`Public IP: ${data.ip}`);
}

</script>

<template>
    <h1>{{ msg }}</h1>

    <div class="card">
        <button type="button" @click=test()>count is {{ count }}</button>
        <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
        </p>
    </div>

</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
