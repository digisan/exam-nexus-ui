import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
// import './style.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n';

// createApp(App).mount('#app')

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount('#app');
