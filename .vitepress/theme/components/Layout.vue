<script setup lang="ts">
// @ts-ignore
// const isDev: boolean = !!import.meta.env.DEV;
let loc
(async () => {
  const domains = [
    'cf.novels.lovemilk.top',
    'cf.notes.lovemilk.top',
    'aka.lovemilk.top',
  ]

  const closeAll = () => {
    document.body.innerHTML = ''
    location.assign('about:blank')
    window.close()
  }

  let res
  for (const domain of domains) {
    try {
      res = await (await fetch(`https://${domain}/cdn-cgi/trace`)).text()
      break
    } catch {}
  }

  if (!res || typeof res !== 'string') {
    closeAll()
    return
  }

  const locMatched = res.match(/loc=([0-9A-Z]{2})/)
  const loc = locMatched ? locMatched[1] : null;

  if (!loc || typeof loc !== 'string') {
    closeAll()
    return
  }

  if (loc === 'T1') {
    closeAll()
    return
  }

  return loc
})().then((data) => {
  loc = data
})

import { computed, ref } from 'vue';
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import { nextTick, provide } from 'vue'
import Toast from 'primevue/toast';
import Analytics from './Analytics.vue';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";

const { Layout } = DefaultTheme

const confirm = useConfirm();

const { isDark, page } = useData()
const isNotFound = computed(() => page.value.isNotFound === undefined ? false : page.value.isNotFound)
const route = useRoute()
const isHome = computed(() => route.path === '/')
const isInternal = computed(() => route.path.startsWith('/_'))

const CNDialog = () => {
  if (!loc || typeof loc !== 'string') {
    setTimeout(CNDialog, 100)
    return
  }

  // if (loc !== 'CN') {
  //   return
  // }

  confirm.require({
    defaultFocus: 'accept',
    header: '不受支持的地区',
    message: '尊敬的用户, 我们注意到您正在从中国大陆访问本网站 该网站尚未取得备案, 不为中国大陆用户提供服务',
    icon: 'pi pi-exclamation-triangle',
    acceptProps: {
      icon: 'pi pi-check',
      label: '关闭网站 (白屏警告)',
      title: '关闭当前网站 (可能出现大面积白色页面)',
    },
    rejectProps: {
      icon: 'pi pi-times',
      label: '关闭弹窗',
      title: '这可能会违反您所在国家与地区的法律法规, 须由您承担一切后果',
      severity: 'danger',
      outlined: true,
    },
    position: 'center',
    blockScroll: true,
    accept() {
      location.assign('about:blank')
      window.close()
    }
  })
}

function enableTransitions() {
  return 'startViewTransition' in document
    && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
})

CNDialog()
</script>

<template>
  <Toast />
  <ConfirmDialog />
  <Analytics v-if="!isNotFound && !isHome && !isInternal" />
  <ClientOnly>
    <Layout />
  </ClientOnly>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;

  & .check {
    transform: none !important;
  }
}
</style>