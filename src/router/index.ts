import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import SysMenu from '../components/SysMenu.vue';
import UserMenu from '../components/SideBar.vue';

const routes = [
    // 默认重定向到 login 页面，当路径无法匹配时
    {
        path: '/:catchAll(.*)', // 捕获所有未匹配的路径
        name: 'unknown',
        redirect: '/login' // 重定向到 login
    },
    {
        path: '/',
        name: 'Home',
        components: {
            default: Login,
            rt_menu: SysMenu,
            sd_menu: UserMenu,
        }
    },
    {
        path: '/login',
        name: 'Login',
        components: {
            default: Login,
            rt_menu: SysMenu,
            sd_menu: UserMenu,
        }
    },
    {
        path: '/register',
        name: 'Register',
        components: {
            default: Register,
            rt_menu: SysMenu,
            sd_menu: UserMenu,
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        components: {
            default: () => import('../views/Dashboard.vue'),
            rt_menu: SysMenu,
            sd_menu: UserMenu,
        },
        meta: { requiresAuth: true },  // 需要身份验证
    },
    {
        path: '/subjects',
        name: 'Subjects',
        components: {
            default: () => import('../views/Subjects.vue'),
            rt_menu: SysMenu,
            sd_menu: UserMenu,
        },
        meta: { requiresAuth: true },  // 需要身份验证
    },
    {
        path: '/plan',
        name: 'Plan',
        components: {
            default: () => import('../views/Plan.vue'),
            rt_menu: SysMenu,
            sd_menu: UserMenu,
        },
        meta: { requiresAuth: true },  // 需要身份验证
    },
    {
        path: '/mind-sharing',
        name: 'MindSharing',
        components: {
            default: () => import('../views/MindSharing.vue'),
            rt_menu: SysMenu,
            sd_menu: UserMenu,
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
