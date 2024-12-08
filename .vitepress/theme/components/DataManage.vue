<template>
    <div w-75vw m-auto m-t-8px class="mw-1024px">
        <Card>
            <template #title>数据管理</template>
            <template #subtitle>管理您在本网站的各项数据</template>
            <template #content>
                <Panel header="Analytics">
                    <p text-xl>是否启用 Analytics</p>
                    <div class="oneline">
                        <p c-red m="0 r-16px">
                            "启用 Analytics" 也意味着您已仔细阅读并均已接受和同意我们使用的 Analytics 服务提供商的相关隐私政策和用户协议
                        </p>
                        <span class="hide" id="enableAnalytics">在本网站上启用 Analytics</span>
                        <ToggleSwitch :title="enableAnalytics ? 'Analytics 已启用' : 'Analytics 已禁用'"
                            aria-labelledby="enableAnalytics" class="to-right oneline-item" v-model="enableAnalytics" />
                    </div>
                </Panel>
            </template>
            <template #footer>
                <Button class="to-right" label="保存配置" @click="saveAll" />
            </template>
        </Card>
    </div>
</template>

<script setup lang='ts'>
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import ToggleSwitch from 'primevue/toggleswitch';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

import { ref, computed } from 'vue';
import { useAnalyticsStore } from '../../../stores/analytics';

const store = useAnalyticsStore()
const agreeAnalytics = computed(() => !!store.agreed);
const enableAnalytics = ref(agreeAnalytics.value)

store.$subscribe((_, state) => {  // 在数据更新时更新 enableAnalytics
    enableAnalytics.value = state.agreed
})

const saveAll = () => {
    if (store.agreed === enableAnalytics.value) {

        toast.add(
            { severity: 'info', summary: '数据管理', detail: `配置未更改`, life: 3000 }
        );
        return
    }
    store.agreed = enableAnalytics.value

    toast.add(
        { severity: 'success', summary: '数据管理', detail: `配置保存成功`, life: 3000 }
    );
}
</script>

<style scoped>
.to-right {
    margin-left: auto;
    float: right;
}

.oneline {
    display: flex;
    align-items: center;
}

.oneline-item {
    flex-shrink: 0;
}

.hide {
    display: none;
}

.mw-1024px {
    max-width: 1024px;
}
</style>