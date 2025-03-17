import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    // resolve: {
    //     alias: {
    //         '@': path.resolve(__dirname, 'src'), // 这里定义 `@` 代表 `src` 目录
    //     },
    // },
})
