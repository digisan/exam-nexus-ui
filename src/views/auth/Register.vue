<template>
    <div class="w-full max-w-[400px] p-5 border-2 border-gray-300 rounded-lg bg-white shadow-md">
        <h2 class="text-center text-2xl font-bold">{{ $t('register') }}</h2>
        <form @submit.prevent="submitRegister">
            <div class="flex flex-col items-start mb-4">
                <label class="font-bold mb-1">{{ $t('email') }}:</label>
                <input class="w-full p-2 m-[5px_0px_0px_0px] border border-gray-300" type="email" v-model="email" required />
            </div>
            <div class="flex flex-col items-start mb-4">
                <label class="font-bold mb-1">{{ $t('password') }}:</label>
                <input class="w-full p-2 m-[5px_0px_0px_0px] border border-gray-300" type="password" v-model="password" required />
            </div>
            <div class="flex flex-col items-start mb-4">
                <label class="font-bold mb-1">{{ $t('confirm-password') }}:</label>
                <input class="w-full p-2 m-[5px_0px_0px_0px] border border-gray-300" type="password" v-model="confirmPassword" required />
            </div>
            <div class="flex">
                <h-captcha class="scale-[0.8] origin-right ml-auto" ref="captcha" sitekey="f758eabc-746c-4316-9932-6af2cd709e8e" @verify="(token) => { captchaResp = token }" @expired="captchaResp = null" />
            </div>
            <button class="w-full p-2.5 bg-[#42b983] m-[8px_0px_0px_0px] text-white border-none cursor-pointer" type="submit" :disabled="!captchaResp || password !== confirmPassword">{{ $t('register') }}</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import HCaptcha from '@hcaptcha/vue3-hcaptcha';
import { useAuthStore } from '../../store/auth';
import { useUIStore } from '../../store/ui';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();

const router = useRouter()

const authStore = useAuthStore()
const uiStore = useUIStore()

const email = ref('');
const password = ref('');
const confirmPassword = ref("");
const captchaResp = ref(null);
const captcha = ref(null);

onMounted(() => {
    uiStore.styleRegister();
});

const submitRegister = async () => {

    if (password.value !== confirmPassword.value) {
        alert("密码和确认密码不一致！");
        return;
    }

    if (!captchaResp.value) {
        alert('请完成验证码验证');
        return;
    }

    const result = await authStore.register({
        email: email.value,
        password: password.value,
        captchaToken: captchaResp.value,
    })

    if (result.success) {
        alert('注册成功');
        await router.push('/login');
    } else {
        alert(`注册失败: ${result.message}`);
    }

    // 重新验证 hCaptcha
    // captcha.value.resetCaptcha();
};
</script>

<style scoped></style>