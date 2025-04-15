<template>
    <aside :class="[
        'relative bg-gray-100 p-5 shadow-lg mt-16 transition-all duration-300',
        isCollapsed ? 'w-21' : 'w-68',
        'rounded-tr-2xl'
    ]">

        <!-- 收起/展开按钮 -->
        <button @click="isCollapsed = !isCollapsed" class="absolute top-1/2 -translate-y-1/2 right-[-12px] w-6 h-16 bg-gray-100 border-none rounded-r-lg flex items-center justify-center hover:bg-gray-200 transition cursor-pointer">
            <!-- SVG 图标 -->
            <svg v-if="isCollapsed" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
        </button>

        <ul class="space-y-3 ml-[-10px]">
            <li v-for="item in menuItems" :key="item.path">
                <router-link :to="item.path" class="flex items-center px-4 py-2 rounded-lg transition duration-300 text-gray-600 text-base font-medium gap-2" :class="{
                    'bg-gray-300 text-black': isActive(item.path),
                    'text-gray-700 hover:bg-gray-200': !isActive(item.path)
                }">
                    <img :src="item.img" alt="" class="w-5 h-5" />
                    <span v-if="!isCollapsed" class="leading-none relative top-0.5">{{ $t(item.label) }}</span>
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import planIcon from "../assets/plan.svg";
import dashboardIcon from "../assets/dashboard.svg";
import subjectsIcon from "../assets/subjects.svg";
import mindSharingIcon from "../assets/mind-sharing.svg";

const route = useRoute();
const isCollapsed = ref(false);

const menuItems = ref([
    { label: 'dashboard', path: '/dashboard', img: dashboardIcon },
    { label: 'subjects', path: '/subjects', img: subjectsIcon },
    { label: 'plan', path: '/plan', img: planIcon },
    { label: 'mind-sharing', path: '/mind-sharing', img: mindSharingIcon }
]);

const isActive = (path) => route.path === path;
</script>