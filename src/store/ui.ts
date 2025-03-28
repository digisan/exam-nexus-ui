import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
    state: () => ({
        showLinkReg: true,
        showLinkIn: true,
    }),
    actions: {
        styleDashboard() {
            this.showLinkReg = false
            this.showLinkIn = false
        },
        styleLogin() {
            this.showLinkReg = true
            this.showLinkIn = false
        },
        styleRegister() {
            this.showLinkReg = false
            this.showLinkIn = true
        }
    },
});
