import { defineStore } from 'pinia';

export const useInfoStore = defineStore('info', {
    state: () => ({
        username: '',
        name: '',
        lastname: '',
        email: '',
        phone: '',
        token: '',
    }),
    actions: {
        setUserInfo(userInfo) {
            this.username = userInfo.username;
            this.name = userInfo.name;
            this.lastname = userInfo.lastname;
            this.email = userInfo.email;
            this.phone = userInfo.phone;
            this.token = userInfo.token;
        },
        clearUserInfo() {
            this.username = '';
            this.name = '';
            this.lastname = '';
            this.email = '';
            this.phone = '';
            this.token = '';
        },
    },
});