import { defineStore } from 'pinia';
import { ref } from 'vue';

const PREFIX = `https://exam-nexus.deno.dev`
const API_LOGIN = `${PREFIX}/api/auth/login`
const API_REGISTER = `${PREFIX}/api/auth/register`
const API_LOGOUT = `${PREFIX}/api/auth/logout`
const API_VALIDATE_TOKEN = `${PREFIX}/api/auth/validate-token`

export const useAuthStore = defineStore('auth', () => {

    const user = ref<string | null>(null);
    const token = ref<string | null>(null);

    const login = async (credentials: any) => {
        const resp = await fetch(API_LOGIN, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        if (resp.ok) {
            const data = await resp.json();
            if (data.token) {
                user.value = credentials.email;
                token.value = data.token;
            }
            return data;
        }
        return { token: '', message: `internal error: @access ${API_LOGIN}` };
    }

    const register = async (data: any) => {
        const resp = await fetch(API_REGISTER, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (resp.ok) {
            return await resp.json();
        }
        return { success: false, message: `internal error: @access ${API_REGISTER}` };
    }

    const logout = async () => {
        if (!token.value) return { message: `@access ${API_LOGOUT} need a token` };
        const resp = await fetch(API_LOGOUT, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`,
            },
        });
        if (resp.ok) {
            user.value = null;
            token.value = null;
            return true;
        }
        return false;
    }

    const isTokenValid = async () => {
        if (!token.value) return { message: `@access ${API_VALIDATE_TOKEN} need a token` };
        const resp = await fetch(API_VALIDATE_TOKEN, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`,
            },
        });
        return resp.ok;
    }

    return {
        user,
        token,
        login,
        register,
        logout,
        isTokenValid,
    };
});
