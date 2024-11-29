import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme';
import type { Theme } from "vitepress";
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

export default <Theme> {
  ...DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    let pinia: any = createPinia()
    pinia.use(piniaPluginPersistedstate)
    app.use(PrimeVue as any, {
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: ".dark"
        }
      }
    })
    app.use(ToastService as any)
    app.component('v-markdown', Vue3MarkdownIt)
    // @ts-expect-error hack :)
    app.component('cover', Cover)
    app.component('part-head', PartHead)
    app.component('uv', UseVar)
    app.component('cb', CornerBrackets)
    app.use(pinia)
  },
  Layout,
} satisfies Theme;
