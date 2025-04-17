import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n';

// createApp(App).mount('#app')

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n); // 全局绑定，直接使用$t()
app.mount('#app');

export { app } // 传递全局绑定特征到动态产生的组件
