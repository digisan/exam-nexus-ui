<template>
    <div class="container">
        <h2>注册</h2>
        <form @submit.prevent="submitRegister">
            <div class="form-group">
                <label>邮箱:</label>
                <input type="email" v-model="email" required />
            </div>
            <div class="form-group">
                <label>密码:</label>
                <input type="password" v-model="password" required />
            </div>
            <div class="form-group">
                <label>确认密码:</label>
                <input type="password" v-model="confirmPassword" required />
            </div>
            <h-captcha ref="captcha" sitekey="f758eabc-746c-4316-9932-6af2cd709e8e" @verify="(token) => { captchaResp = token }" @expired="captchaResp = null" />
            <button type="submit" :disabled="!captchaResp || password !== confirmPassword">注册</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import HCaptcha from '@hcaptcha/vue3-hcaptcha';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore()

const email = ref('');
const password = ref('');
const confirmPassword = ref("");
const captchaResp = ref(null);
const captcha = ref(null);

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
    } else {
        alert(`注册失败: ${result.message}`);
    }

    // 重新验证 hCaptcha
    captcha.value.resetCaptcha();
};
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* 确保 label 左对齐 */
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
    /* 让 label 和输入框有间距 */
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    width: 100%;
    padding: 10px;
    background: #42b983;
    color: white;
    border: none;
    cursor: pointer;
}
</style>