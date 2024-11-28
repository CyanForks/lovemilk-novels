<template>
    <div>
        <Card>
            <template #title>数据管理</template>
            <template #content>
                <Panel header="Analytics">
                    <p class="text-xl">是否启用 Analytics</p>
                    <p class="m-0 danger">
                        `启用 Analytics` 也意味着您已仔细阅读并均已接受和同意我们使用的 Analytics 服务提供商的相关隐私政策和用户协议
                    </p>
                    <ToggleButton v-model="enableAnalytics" onLabel="已启用" offLabel="已禁用" />
                </Panel>
            </template>
            <template #footer>
                <Button label="保存配置" @click="saveAll" />
            </template>
        </Card>
    </div>
</template>

<script setup lang='ts'>
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';
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
    store.agreed = enableAnalytics.value

    toast.add(
        { severity: 'success', summary: '数据管理', detail: `配置保存成功`, life: 3000 }
    );
}
</script>

<style scoped>
.danger {
    color: #ff4d4f
}
</style>