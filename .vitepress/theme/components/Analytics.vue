<template>
    <Toast />
    <Drawer ref="drawer" v-model:visible="showDialog" position="bottom" style="height: auto;" :dismissable="false"
        :showCloseIcon="false" :blockScroll="true" @hide="handleClose(false)">
        <template #header>
            <!-- m-auto 居中 -->
            <div class="p-drawer-title flex m-auto no-select">
                <p>用户行为收集提示</p>
            </div>
        </template>

        <div class="flex justify-center no-select">
            <p>该网站使用 Analytics, 这是为了帮助我们提供更好的用户体验, 给用户带来福祉.<br>我们使用的 Analytics 服务提供商: Google Analytics, Microsoft
                Clarity.</p>
        </div>
        <template #footer>
            <div class="flex justify-center gap-4">
                <Button label="接受并同意 Analytics" severity="success" @click="handleClose(true)" :disabled="disableButtons" />
                <Button label="关闭网站" severity="danger" outlined @click="handleClose(false)" :disabled="disableButtons" />
            </div>
        </template>
    </Drawer>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const toast = useToast();

const drawer = useTemplateRef('drawer');
const disableButtons = ref(false);
const showDialog = ref(localStorage.getItem('lovemilk-allow-analytics') !== 'true');

let allowAnalytics;
const tillApprove = new Promise((resolve) => {
    allowAnalytics = resolve;
})
if (!showDialog.value) {
    allowAnalytics();
}

let handleClose = async (state: boolean) => {
    disableButtons.value = true;

    if (!state) {
        // let useYouTube = false;
        // try {
        //     const trace = await (await fetch('https://aka.lovemilk.top/cdn-cgi/trace/')).text()
        //     if (!trace.includes('loc=CN')) {
        //         useYouTube = true;
        //     }
        // } catch (e) { }

        // window.close();
        // location.href = useYouTube ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' : 'https://www.bilibili.com/video/BV1GJ411x7h7/';

        setTimeout(() => { window.close(); location.href = 'about:blank'; }, 1500);
        toast.add(
            { severity: 'warn', summary: '关闭提示', detail: '即将跳转至空白页面', life: 1500 }
        );
        return;
    }

    localStorage.setItem('lovemilk-allow-analytics', 'true')
    handleClose = async (state: boolean) => { }  // 防止 @hide 时重复执行
    showDialog.value = false;

    allowAnalytics()
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
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            // @ts-ignore
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
            // @ts-ignore
            t.onload = (e) => {
                resolve(e);
            }
            // @ts-ignore
            t.onerror = (e) => {
                reject(e);
            }
        })(window, document, "clarity", "script", "ode07yeuls");  // @ts-ignore
    });
}

const loadGoogleAnalytics = async () => {
    return new Promise((resolve, reject) => {
        const gaScript = document.createElement('script');
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-KM85VFC4LJ';
        gaScript.async = true;
        const e = document.getElementsByTagName('script')[0];
        e.parentNode?.insertBefore(gaScript, e);
        gaScript.onload = (e) => {
            resolve(e);
        }
        gaScript.onerror = (e) => {
            reject(e);
        }

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

Promise.all([loadAll(),]).then();
</script>

<style scoped>
.no-select {
    user-select: none;
}
</style>