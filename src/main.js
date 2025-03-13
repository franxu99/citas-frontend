import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import Aura from '@primeuix/themes/aura';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'false',
            cssLayer: false
        }
    }
 });
app.mount('#app');