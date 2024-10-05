import DefaultTheme from 'vitepress/theme';
import { App } from 'vue';

import 'unocss';
import 'virtual:uno.css';

import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import ToastService from 'primevue/toastservice';

import UseVar from './components/UseVar.vue';
import Layout from './components/Layout.vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(PrimeVue, { theme: { preset: Lara }})
    app.use(ToastService)
    app.component('uv', UseVar)
  },
  Layout,
};
