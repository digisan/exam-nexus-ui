import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {

        // not tested
        async login(credentials: any) {
            const resp = await fetch('http://localhost:8001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const data = await resp.json();
            if (resp.ok) {
                this.user = data.user;
                this.token = data.token;
            } else {
                throw new Error(data.message || '登录失败');
            }
        },

        // tested
        async register(data: any) {
            const api = 'http://localhost:8001/api/auth/register';
            const resp = await fetch(api, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (resp.ok) {
                return await resp.json();
            }
            return { "success": false, "message": `internal error: @access ${api}` }
        },
    },
});
