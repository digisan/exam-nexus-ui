<template>
    <div class="w-full max-w-[400px] p-5 border-2 border-gray-300 rounded-lg bg-white shadow-md">
        <h2 class="text-center text-2xl font-bold">{{ $t('login') }}</h2>
        <form @submit.prevent="submitLogin">
            <div class="flex flex-col items-start mb-4">
                <label class="font-bold mb-1">{{ $t('email') }}:</label>
                <input class="w-full p-2 m-[5px_0px_0px_0px] border border-gray-300" type="email" v-model="email" required />
            </div>
            <div class="flex flex-col items-start mb-4">
                <label class="font-bold mb-1">{{ $t('password') }}:</label>
                <input class="w-full p-2 m-[5px_0px_0px_0px] border border-gray-300" type="password" v-model="password" required />
            </div>
            <div class="flex">
                <h-captcha class="scale-[0.8] origin-right ml-auto" ref="captcha" sitekey="f758eabc-746c-4316-9932-6af2cd709e8e" @verify="(token) => captchaResp = token" @expired="captchaResp = null" />
            </div>
            <button class="w-full p-2.5 bg-[#42b983] m-[8px_0px_0px_0px] text-white border-none cursor-pointer" type="submit" :disabled="!captchaResp">{{ $t('login') }}</button>
        </form>
        <p class="text-right mt-[5px]">
            {{ $t('register-prompt-1') }}
            <router-link to="/register" class="text-blue-600">{{ $t('register') }}</router-link>
            {{ $t('register-prompt-2') }}
        </p>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import HCaptcha from '@hcaptcha/vue3-hcaptcha';
import { useAuthStore } from '../../store/auth';
import { useUIStore } from '../../store/ui';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useLoadingStore } from '../../store/loading';

const loading = useLoadingStore();

const router = useRouter()

const authStore = useAuthStore()
const uiStore = useUIStore();
const { user, token } = storeToRefs(authStore)

const email = ref('');
const password = ref('');
const captchaResp = ref(null);
const captcha = ref(null);

onMounted(() => { });

const submitLogin = async () => {
    if (!captchaResp.value) {
        alert('请完成验证码验证');
        return;
    }

    loading.showLoading('正在登录...');

    try {
        const result = await authStore.login({
            email: email.value,
            password: password.value,
            captchaToken: captchaResp.value,
        });

        if (result.token) {
            loading.showLoading('登录成功，正在跳转...');
            await router.push('/dashboard');
        } else {
            alert('登录失败: ' + result.message);
        }

    } catch (err) {
        alert('发生错误: ' + err.message);
    } finally {
        loading.hideLoading();
    }
};

</script>

<style scoped></style>
