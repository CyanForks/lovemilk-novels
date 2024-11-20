import DefaultTheme from 'vitepress/theme';
import type { Theme } from "vitepress";
import { App } from 'vue';
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'virtual:uno.css';

import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import ToastService from 'primevue/toastservice';
import Vue3MarkdownIt from 'vue3-markdown-it';

import UseVar from './components/UseVar.vue';
import Layout from './components/Layout.vue';
import Cover from './components/Cover.vue';
import PartHead from './components/PartHead.vue';
import CornerBrackets from './components/CornerBrackets.vue';

export default {
  ...DefaultTheme,
  // @ts-ignore
  enhanceApp({ app }: {app: App}) {
    let pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    app.use(PrimeVue, { theme: { preset: Lara } })
    app.use(ToastService)
    app.component('v-markdown', Vue3MarkdownIt)
    app.component('cover', Cover)
    app.component('part-head', PartHead)
    app.component('uv', UseVar)
    app.component('cb', CornerBrackets)
    app.use(pinia)
  },
  Layout,
  // @ts-ignore
} satisfies Theme;
