<template>
  <Toast />
  <Drawer ref="drawer" v-model:visible="showDialog" style="height: auto" position="bottom" :dismissable="false"
    :showCloseIcon="false" :blockScroll="true">
    <template #header>
      <!-- m-auto 居中 -->
      <div class="p-drawer-title" flex select-none m="auto">
        <p>用户行为收集提示</p>
      </div>
    </template>

    <div text="center" select-none>
      <p>该网站使用 Analytics, 这是为了帮助我们提供更好的用户体验, 给用户带来福祉.</p>
      <p>我们使用的 Analytics 服务提供商: Google Analytics, Microsoft Clarity.</p>
    </div>
    <template #footer>
      <div justify-center flex gap="4">
        <Button label="接受并同意 Analytics" severity="success" @click="approveAnalytics" :disabled="disableButtons" />
        <Button label="关闭网站" severity="danger" outlined @click="handleClose" :disabled="disableButtons" />
      </div>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useAnalyticsStore } from "../../../stores/analytics";

const toast = useToast();

const drawer = useTemplateRef('drawer');
const disableButtons = ref(false);
const store = useAnalyticsStore()
const showDialog = computed(() => !store.agreed);

function approveAnalytics() {
  store.agreed = true
}

const tillApprove = new Promise((resolve) => {
  if (store.agreed) {
    resolve(void 0)
  }

  store.$subscribe((mutation, { agreed }) => {
    if (agreed) {
      resolve(void 0)
    }
  })
})

function handleClose() {
  document.head.style.transition = 'display 2s ease';
  // @ts-ignore
  document.getElementById("app").style.display = 'none';
  location.assign(new URL("https://ggl.link/redir-youtube"))
  window.close()
}

const loadAll = async () => {
  await tillApprove;

  let errorCount = 0;

  try {
    await loadClarity();
  } catch (e) {
    errorCount++;
    console.error(e);
    toast.add(
      { severity: 'error', summary: 'Analytics', detail: `加载 Microsoft Clarity 失败`, life: 3000 }
    );
  }
  try {
    await loadGoogleAnalytics();
  } catch (e) {
    errorCount++;
    console.error(e);
    toast.add(
      { severity: 'error', summary: 'Analytics', detail: `加载 Google Analytics 失败`, life: 3000 }
    );
  }

  if (!errorCount) {
    toast.add(
      { severity: 'success', summary: 'Analytics', detail: '已加载 Analytics 脚本', life: 1500 }
    );
  }
}

const loadClarity = async () => {
  return new Promise((resolve, reject) => {
    (function (c, l, a, r, i, t, y) {
      // @ts-ignore
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
      // @ts-ignore
      t = l.createElement(r);
      // @ts-ignore
      t.async = 1;
      // @ts-ignore
      t.src = "https://www.clarity.ms/tag/" + i;
      // @ts-ignore
      y = l.getElementsByTagName(r)[0];
      // @ts-ignore
      y.parentNode.insertBefore(t, y);
      // @ts-ignore
      t.onload = resolve
      // @ts-ignore
      t.onerror = reject
    })(window, document, "clarity", "script", "ode07yeuls");  // @ts-ignore
  });
}

const loadGoogleAnalytics = async () => {
  return new Promise((resolve, reject) => {
    const gaScript = document.createElement('script');
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-KM85VFC4LJ';
    gaScript.async = true;
    const e = document.getElementsByTagName('script')[0];
    // @ts-ignore
    e.parentNode.insertBefore(gaScript, e);
    gaScript.onload = resolve
    gaScript.onerror = reject

    // @ts-ignore
    window.dataLayer = window.dataLayer || [];

    // @ts-ignore
    function gtag() { dataLayer.push(arguments); }

    // @ts-ignore
    gtag('js', new Date());
    // @ts-ignore
    gtag('config', 'G-KM85VFC4LJ');
  });
}

loadAll().then();
</script>
