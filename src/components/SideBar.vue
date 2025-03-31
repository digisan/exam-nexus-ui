<template>
    <aside class="w-68 bg-gray-100 p-5 shadow-lg mt-16">
        <ul class="space-y-3 ml-[-10px]">
            <li v-for="item in menuItems" :key="item.path">
                <router-link :to="item.path" class="flex block px-4 py-2 rounded-lg transition duration-300 text-gray-600 text-base font-medium gap-2" :class="{ 'bg-gray-300 text-black': isActive(item.path), 'text-gray-700 hover:bg-gray-200': !isActive(item.path) }">
                    <img :src="item.img" alt="" class="w-5 h-5" /><span class="leading-none relative top-0.4">{{ item.label }}</span>
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import planIcon from "../assets/plan.svg";
import dashboardIcon from "../assets/dashboard.svg";
import subjectsIcon from "../assets/subjects.svg";
import mindSharingIcon from "../assets/mind-sharing.svg"

const route = useRoute();
const menuItems = ref([
    { label: 'Dashboard', path: '/dashboard', img: dashboardIcon },
    { label: 'Subjects', path: '/subjects', img: subjectsIcon },
    { label: 'Plan', path: '/plan', img: planIcon },
    { label: 'Mind Sharing', path: '/mind-sharing', img: mindSharingIcon }
]);

const isActive = (path) => route.path === path;

</script>