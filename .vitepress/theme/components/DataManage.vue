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
                <Panel header="区域检查" mt-6>
                    <p text-xl>开启后将禁用区域检查, 允许您在不受支持的区域访问本网站而不会收到弹窗警告</p>
                    <div class="oneline">
                        <p c-red m="0 r-16px">
                            这可能会违反您所在国家与地区的法律法规, 须由您承担一切后果
                            
                        </p>
                        <p c-coolGray m="0 r-16px">
                            该选项在刷新页面后生效
                        </p>
                        <span class="hide" id="ignoreRegionCheck">在本网站上启用 Analytics</span>
                        <ToggleSwitch :title="ignoreRegionCheck ? '区域检查已禁用' : '区域检查已启用'"
                            aria-labelledby="ignoreRegionCheck" class="to-right oneline-item" v-model="ignoreRegionCheck" />
                    </div>
                </Panel>
                <div mb-3 />
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
import { useRegionCheckStore } from '../../../stores/regionCheck';

const analyticsStore = useAnalyticsStore()
const regionCheckStore = useRegionCheckStore()
const enableAnalyticsComputed = computed(() => !!analyticsStore.agreed);
const enableAnalytics = ref(enableAnalyticsComputed.value)
const ignoreRegionCheckComputed = computed(() => !!regionCheckStore.ignoreUnsupportedRegion)
const ignoreRegionCheck = ref(ignoreRegionCheckComputed.value)

analyticsStore.$subscribe((_, state) => {  // 在数据更新时更新 enableAnalytics
    enableAnalytics.value = state.agreed
})

regionCheckStore.$subscribe((_, state) => {
    ignoreRegionCheck.value = state.ignoreUnsupportedRegion
})

const saveAll = () => {
    if (analyticsStore.agreed === enableAnalytics.value && regionCheckStore.ignoreUnsupportedRegion === ignoreRegionCheck.value) {

        toast.add(
            { severity: 'info', summary: '数据管理', detail: `配置未更改`, life: 3000 }
        );
        return
    }
    analyticsStore.agreed = enableAnalytics.value
    regionCheckStore.ignoreUnsupportedRegion = ignoreRegionCheck.value

    toast.add(
        { severity: 'success', summary: '数据管理', detail: `配置保存成功`, life: 3000 }
    );
}
</script>

<style scoped>
.to-right {
    margin-left: auto;
    margin-right: 0;
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