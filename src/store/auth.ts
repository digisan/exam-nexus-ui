import { defineStore } from 'pinia';

const PREFIX = 'http://localhost:8001'
const API_LOGIN = `${PREFIX}/api/auth/login`
const API_REGISTER = `${PREFIX}/api/auth/register`

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {

        async login(credentials: any) {
            const resp = await fetch(API_LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            if (resp.ok) {
                const data = await resp.json();
                if (data.token) {
                    this.user = credentials.email; // current user
                    this.token = data.token // current token
                }
                return data
            }
            return { "token": "", "message": `internal error: @access ${API_LOGIN}` }
        },

        async register(data: any) {
            const resp = await fetch(API_REGISTER, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (resp.ok) {
                return await resp.json();
            }
            return { "success": false, "message": `internal error: @access ${API_REGISTER}` }
        },

        async logout() {

        }
    },
});
