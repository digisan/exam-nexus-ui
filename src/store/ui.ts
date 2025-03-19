import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
    state: () => ({
        showLinkReg: true,
        showLinkIn: true,
        showLinkOut: false,
    }),
    actions: {
        styleDashboard() {
            this.showLinkReg = false
            this.showLinkIn = false
            this.showLinkOut = true
        },
        styleLogin() {
            this.showLinkReg = true
            this.showLinkIn = false
            this.showLinkOut = false
        },
        styleRegister() {
            this.showLinkReg = false
            this.showLinkIn = true
            this.showLinkOut = false
        }
    },
});
