import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import SysMenu from '../components/SysMenu.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        components: {
            default: Login,
            rt_menu: SysMenu,
        }
    },
    {
        path: '/login',
        name: 'Login',
        components: {
            default: Login,
            rt_menu: SysMenu,
        }
    },
    {
        path: '/register',
        name: 'Register',
        components: {
            default: Register,
            rt_menu: SysMenu,
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        components: {
            default: Dashboard,
            rt_menu: SysMenu, // () => import('../components/SysMenu.vue'),
        },
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
