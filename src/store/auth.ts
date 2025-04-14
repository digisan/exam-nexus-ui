import { defineStore } from 'pinia';

const PREFIX = `https://exam-nexus.deno.dev`
const API_LOGIN = `${PREFIX}/api/auth/login`
const API_REGISTER = `${PREFIX}/api/auth/register`
const API_LOGOUT = `${PREFIX}/api/auth/logout`
const API_VALIDATE_TOKEN = `${PREFIX}/api/auth/validate-token`

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {

        async login(credentials: any) {
            const resp = await fetch(API_LOGIN, {
                method: 'POST',
                mode: 'cors',
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
            if (!this.token) return { "message": `@access ${API_LOGOUT} need a token` };
            const resp = await fetch(API_LOGOUT, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
            });
            if (resp.ok) {
                this.user = null
                this.token = null
                return true
            }
            return false
        },

        async isTokenValid() {
            if (!this.token) return { "message": `@access ${API_VALIDATE_TOKEN} need a token` };
            const resp = await fetch(API_VALIDATE_TOKEN, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
            });
            return resp.ok
        }
    },
});
