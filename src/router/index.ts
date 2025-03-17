import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    // { path: '/logout', component: Logout },
    { path: '/register', component: Register },
    // {
    //     path: '/dashboard',
    //     name: 'Dashboard',
    //     component: Dashboard,
    //     meta: { requiresAuth: true },  // 需要身份验证
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 设置全局导航守卫
router.beforeEach((to, from, next) => {
    // 判断目标路由是否需要身份验证
    if (to.meta.requiresAuth) {
        // 检查 token（你可以根据实际情况从 localStorage、Vuex 或 cookies 中获取）
        const token = localStorage.getItem('token'); // 这里示例从 localStorage 获取 token
        if (!token) {
            // 如果没有 token，跳转到登录页面
            next({ name: 'Login' });
        } else {
            // 如果有 token，继续执行路由
            next();
        }
    } else {
        // 如果不需要验证，直接跳转
        next();
    }
});

export default router;


