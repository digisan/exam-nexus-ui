import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';

const routes = [
    { path: '/', name: 'Home', component: () => import('../views/Login.vue') },
    { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
    { path: '/register', name: 'Register', component: () => import('../views/Register.vue') },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true },  // 需要身份验证
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const authStore = useAuthStore();
        const isAuthenticated = authStore.user && authStore.token && authStore.isTokenValid(); // 检查 token 是否存在且有效
        !isAuthenticated ? next({ name: 'Login' }) : next();
    } else {
        next();
    }
});

export default router;
