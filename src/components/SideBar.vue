<template>
    <aside class="w-48 bg-gray-100 p-5 shadow-lg mt-16">
        <ul class="space-y-4">
            <li v-for="item in menuItems" :key="item.path">
                <router-link :to="item.path" class="block px-4 py-2 rounded-lg transition duration-300" :class="{ 'bg-gray-300 text-black': isActive(item.path), 'text-gray-700 hover:bg-gray-200': !isActive(item.path) }">
                    {{ item.label }}
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const menuItems = ref([
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Subjects', path: '/subjects' },
    { label: 'Plan', path: '/plan' },
    { label: 'Mind Sharing', path: '/mind-sharing' }
]);

const isActive = (path) => route.path === path;

</script>