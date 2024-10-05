import DefaultTheme from 'vitepress/theme';
import type { Theme } from "vitepress";
import { App } from 'vue';
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'virtual:uno.css';

import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import ToastService from 'primevue/toastservice';

import UseVar from './components/UseVar.vue';
import Layout from './components/Layout.vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    let pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    app.use(pinia)
    app.use(PrimeVue, { theme: { preset: Lara }})
    app.use(ToastService)
    app.component('uv', UseVar)
  },
  Layout,
} satisfies Theme;
